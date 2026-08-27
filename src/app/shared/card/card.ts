import { Component, Input } from '@angular/core';
import { Player } from '../../data/models/player.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() player!: Player;
  protected activeTab: 'perfil' | 'posicion' | 'virtudes' | 'psico' | 'stats' = 'perfil';

  protected selectTab(tab: 'perfil' | 'posicion' | 'virtudes' | 'psico' | 'stats') {
    this.activeTab = tab;
  }

  getPlayerSteamId(alias: string): string | undefined {
    const ids: Record<string, string> = {
      parca: '76561198301504889',
      peter: '76561198041309771',
      doda: '76561199015608983',
      kevin: '76561198143673849',
      kike: '76561198415119986',
      fede: '76561198395532972',
      porco: '',
      xuiz: '',
    };
    return ids[alias];
  }

  protected getAbbrev(alias: string): string {
    const abbs: Record<string, string> = {
      parca: 'Parca',
      peter: 'Peter',
      doda: 'Dida',
      kevin: 'Kevs',
      kike: 'Kike',
      fede: 'Fede',
      porco: 'Porco',
      xuiz: 'Xuiz',
    };
    return abbs[alias] || alias;
  }

  getObjectPosition(alias: string): string {
    if (alias === 'parca') {
      return 'center 60%';
    }
    return 'center center';
  }
}