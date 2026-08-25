import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card } from '../../shared/card/card';
import { starters, reserves } from '../../data/models/players.mock';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subject, Observable, of, interval } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';

export interface RealPlayerStats {
  alias: string;
  playerName: string;
  avatar?: string;
  stats: {
    totalMatches: number;
    avgKills: number;
    avgDeaths: number;
    avgAssists: number;
    avgKd: number;
    avgHeadshotPct: number;
    avgRating: number;
  };
  source: string;
}

export interface RealTeamResponse {
  players: RealPlayerStats[];
  timestamp: number;
}

@Component({
  imports: [Card, CommonModule],
  selector: 'app-team',
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team implements OnInit, OnDestroy {
  protected readonly starters = starters;
  protected readonly reserves = reserves;

  realStatsMap: Map<string, RealPlayerStats> = new Map();
  isLoadingStats = false;
  statsError: string | null = null;
  hasRealStats = false;
  lastUpdated: Date | null = null;
  private destroy$ = new Subject<void>();
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  private readonly SERVER_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api';

  readonly roles: { name: string; color: string; icon: string; players: string[] }[] = [
    { name: 'IGL', color: '#4ade80', icon: '🧠', players: ['parca'] },
    { name: 'Entry Fragger', color: '#f87171', icon: '⚡', players: ['peter'] },
    { name: 'Anchor Rifler', color: '#f59e42', icon: '🔥', players: ['doda'] },
    { name: 'Star Rifler', color: '#fbbf24', icon: '💥', players: ['kevin'] },
    { name: 'Standard Rifler', color: '#60a5fa', icon: '🎯', players: ['kike'] },
    { name: 'Lurker', color: '#a78bfa', icon: '🕶️', players: ['fede'] },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRealStats();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  private fetchRealStats() {
    this.isLoadingStats = true;
    this.statsError = null;

    this.http.get<RealTeamResponse>(`${this.SERVER_URL}/players`).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.processRealStats(data.players);
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
        this.isLoadingStats = false;
        this.statsError = 'Server no disponible';
      },
    });
  }

  private processRealStats(players: RealPlayerStats[]) {
    this.realStatsMap.clear();
    for (const p of players) {
      this.realStatsMap.set(p.alias, p);
    }
    this.hasRealStats = players.some(p => p.stats.totalMatches > 0);
    this.isLoadingStats = false;
    this.lastUpdated = new Date();

    if (this.hasRealStats) {
      this.refreshInterval = setInterval(() => this.fetchRealStats(), 5 * 60 * 1000);
    }
  }

  getStatForPlayer(alias: string): RealPlayerStats | undefined {
    return this.realStatsMap.get(alias);
  }

  getRatingForPlayer(alias: string): number | undefined {
    const stat = this.getStatForPlayer(alias);
    return stat?.stats.avgRating;
  }

  getKdForPlayer(alias: string): number | undefined {
    const stat = this.getStatForPlayer(alias);
    return stat?.stats.avgKd;
  }

  getHsPctForPlayer(alias: string): number | undefined {
    const stat = this.getStatForPlayer(alias);
    return stat?.stats.avgHeadshotPct;
  }

  getPlayerSteamId(alias: string): string | undefined {
    const ids: Record<string, string> = {
      parca: '76561198301504889',
      peter: '76561198041309771',
      doda: '76561199015608983',
      kevin: '76561198143673849',
      kike: '76561198415119986',
      fede: '76561198395532972',
    };
    return ids[alias];
  }

  getRoleDescription(role: string): string {
    const descriptions: Record<string, string> = {
      'IGL': 'Líder en el juego y toma de decisiones',
      'Entry Fragger': 'Primer muerto del equipo',
      'Anchor Rifler': 'Fragmentador secundario con rifle',
      'Star Rifler': 'Fragmentador secundario con rifle',
      'Standard Rifler': 'Fragmentador secundario con rifle',
      Lurker: 'Jugador independiente del equipo',
    };
    return descriptions[role] || '';
  }

  getEcoRole(role: string): string {
    const eco: Record<string, string> = {
      'IGL': 'Full buy o eco según ronda',
      'Entry Fragger': 'Entry en full buy',
      'Anchor Rifler': 'Siempre lista para full buy',
      'Star Rifler': 'Siempre lista para full buy',
      'Standard Rifler': 'Siempre lista para full buy',
      Lurker: 'Compra secundaria cuando hay eco',
    };
    return eco[role] || '';
  }

  getStrategyRole(role: string): string {
    const strategy: Record<string, string> = {
      'IGL': 'Llama ejecuciones y rotates',
      'Entry Fragger': 'Breaker y entrada a sites',
      'Anchor Rifler': 'Soporte en executes y trades',
      'Star Rifler': 'Soporte en executes y trades',
      'Standard Rifler': 'Soporte en executes y trades',
      Lurker: 'Lurk y pick kills',
    };
    return strategy[role] || '';
  }

  getPlayerAbilities(role: string): string[] {
    const abilities: Record<string, string[]> = {
      'IGL': ['🧠 Callouts y rotates', '📊 Stat tracking', '🎮 In-game calling'],
      'Entry Fragger': ['⚡ Primer muerto', '🔥 Clutch rounds', '🎯 Quick scoping'],
      'Anchor Rifler': ['💥 Fragging defensivo', '🎯 Trades con entry', '📊 Reading de utility enemiga'],
      'Star Rifler': ['💥 Fragging de entrada', '🎯 Trades con entry', '📊 Reading de utility enemiga'],
      'Standard Rifler': ['💥 Fragging de entrada', '🎯 Trades con entry', '📊 Reading de utility enemiga'],
      Lurker: ['🕶️ Lurking de retakes', '⏰ Timing execution', '🎯 Pick kills'],
    };
    return abilities[role] || [];
  }

  formatTimeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'ahora';
    if (mins < 60) return `hace ${mins}m`;
    return `hace ${Math.floor(mins / 60)}h`;
  }
}