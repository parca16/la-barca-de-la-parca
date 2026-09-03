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

  getPlayerSteamUrl(alias: string): string | undefined {
    const ids: Record<string, string> = {
      parca: '76561198301504889',
      peter: '76561198041309771',
      doda: '76561199015608983',
      kevin: '76561198143673849',
      kike: '76561198415119986',
      fede: '76561198395532972',
      porco: '76561199790384537',
      xuiz: 'blackyolo22',
    };
    const id = ids[alias];
    if (!id) return undefined;
    return id.startsWith('7656')
      ? `https://steamcommunity.com/profiles/${id}`
      : `https://steamcommunity.com/id/${id}`;
  }

  getPlayerFaceitUrl(alias: string): string {
    const urls: Record<string, string> = {
      parca: 'https://www.faceit.com/en/players/parca16',
      peter: 'https://www.faceit.com/en/players/selav28',
      doda: 'https://www.faceit.com/en/players/niturbo',
      kevin: 'https://www.faceit.com/en/players/Kevimuxx69',
      kike: 'https://www.faceit.com/en/players/Kakii145',
      fede: 'https://www.faceit.com/en/players/danielo9',
      porco: 'https://www.faceit.com/en/players/PuercoManco',
      xuiz: 'https://www.faceit.com/en/players/Blackyolo22',
    };
    return urls[alias] || '';
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

  isLightColor(hexColor?: string): boolean {
    if (!hexColor) return false;
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
  }
}