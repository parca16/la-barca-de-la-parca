import { Component } from '@angular/core';
import { players } from '../../data/models/players.mock';

@Component({
  imports: [],
  selector: 'app-roles',
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  protected readonly players = players;

  readonly roles: { name: string; color: string; icon: string; players: string[] }[] = [
    {
      name: 'Rifler',
      color: '#f59e42',
      icon: '🔥',
      players: ['c4rlos'],
    },
    {
      name: 'AWPer',
      color: '#60a5fa',
      icon: '🎯',
      players: ['n1tro'],
    },
    {
      name: 'IGL',
      color: '#4ade80',
      icon: '🧠',
      players: ['b1nd'],
    },
    {
      name: 'Entry Fragger',
      color: '#f87171',
      icon: '⚡',
      players: ['d00m'],
    },
    {
      name: 'Lurker',
      color: '#a78bfa',
      icon: '🕶️',
      players: ['shad0w'],
    },
  ];

  protected getRoleDescription(role: string): string {
    const descriptions: Record<string, string> = {
      Rifler: 'Fragmentador secundario con rifle',
      AWPer: 'Uso de rifle de precisión',
      IGL: 'Líder en el juego y toma de decisiones',
      'Entry Fragger': 'Primer muerto del equipo',
      Lurker: 'Jugador independiente del equipo',
    };
    return descriptions[role] || '';
  }

  protected getEcoRole(role: string): string {
    const eco: Record<string, string> = {
      Rifler: 'Siempre lista para full buy',
      AWPer: 'AW o full buy según eco',
      IGL: 'Full buy o eco según ronda',
      'Entry Fragger': 'Entry en full buy',
      Lurker: 'Compra secundaria cuando hay eco',
    };
    return eco[role] || '';
  }

  protected getStrategyRole(role: string): string {
    const strategy: Record<string, string> = {
      Rifler: 'Soporte en executes y trades',
      AWPer: 'Overwatch y control del mapa',
      IGL: 'Llama ejecuciones y rotates',
      'Entry Fragger': 'Breaker y entrada a sites',
      Lurker: 'Lurk y pick kills',
    };
    return strategy[role] || '';
  }
}