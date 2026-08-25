import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SteamApiService, MatchEntry, PlayerSummary, PlayerMatchStats } from './steam-api.service';

export interface TeamPlayer {
  steamId: string;
  alias: string;
  role: string;
}

export interface TeamStats {
  playerAlias: string;
  playerName: string;
  role: string;
  totalMatches: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgKd: number;
  avgHeadshotPct: number;
  avgRating: number;
}

const DEFAULT_AVG_ROUNDS = 35;

@Injectable({
  providedIn: 'root',
})
export class TeamStatsService {
  constructor(private readonly steamApi: SteamApiService) {}

  calculateTeamStats(players: TeamPlayer[]): Observable<TeamStats[]> {
    if (players.length === 0) {
      return of([]);
    }

    const playerObservables = players.map((player) =>
      this.fetchPlayerStats(player).pipe(
        catchError((err) => {
          console.error(`Failed to fetch stats for ${player.alias}:`, err);
          return of(this.getDefaultStats(player));
        })
      )
    );

    return forkJoin(playerObservables);
  }

  private fetchPlayerStats(player: TeamPlayer): Observable<TeamStats> {
    return this.steamApi.getPlayerSummaries([player.steamId]).pipe(
      switchMap((summaries) => {
        const summary = summaries[0] || {
          player_name: '',
          avatar: '',
          avatarfull: '',
          profilestate: 0,
          communityvisibilitystate: 0,
        };

        return this.steamApi.getMatchHistory(player.steamId).pipe(
          map((matches) =>
            this.computeStats(player, summary, matches)
          )
        );
      })
    );
  }

  private computeStats(
    player: TeamPlayer,
    summary: PlayerSummary,
    matches: MatchEntry[]
  ): TeamStats {
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let totalHeadshotPct = 0;
    let matchCount = 0;
    let totalRoundsForKd = 0;

    for (const match of matches) {
      const ranking = this.extractPlayerFromMatch(match, player.steamId);
      if (!ranking?.stats) continue;

      const { kills, deaths, assists, headshot_percentage } = ranking.stats;
      matchCount++;
      totalKills += kills || 0;
      totalDeaths += deaths || 0;
      totalAssists += assists || 0;
      totalHeadshotPct += headshot_percentage || 0;
      totalRoundsForKd += DEFAULT_AVG_ROUNDS;
    }

    if (matchCount === 0) {
      return this.getDefaultStats(player);
    }

    const avgKills = totalKills / matchCount;
    const avgDeaths = totalDeaths / matchCount;
    const avgAssists = totalAssists / matchCount;
    const avgKd = avgDeaths > 0 ? avgKills / avgDeaths : avgKills;
    const avgHeadshotPct = totalHeadshotPct / matchCount;
    const avgRating =
      Math.max(0.01, Math.min(2.0,
        Math.max(0, (totalKills - totalDeaths) / Math.max(totalRoundsForKd, 1)) + 0.5
      ));

    return {
      playerAlias: player.alias,
      playerName: summary.player_name || player.alias,
      role: player.role,
      totalMatches: matchCount,
      avgKills,
      avgDeaths,
      avgAssists,
      avgKd,
      avgHeadshotPct,
      avgRating,
    };
  }

  extractPlayerFromMatch(
    match: MatchEntry,
    steamId: string
  ): PlayerMatchStats | null {
    if (!match.ranking || !Array.isArray(match.ranking)) return null;
    return match.ranking.find((r) => r.steamid === steamId) || null;
  }

  private getDefaultStats(player: TeamPlayer): TeamStats {
    return {
      playerAlias: player.alias,
      playerName: player.alias,
      role: player.role,
      totalMatches: 0,
      avgKills: 0,
      avgDeaths: 0,
      avgAssists: 0,
      avgKd: 0,
      avgHeadshotPct: 0,
      avgRating: 0,
    };
  }
}