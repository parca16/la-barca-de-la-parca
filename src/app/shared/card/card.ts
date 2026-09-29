import { Component, computed, input } from '@angular/core';
import { Player } from '../../data/models/player.interface';

const STEAM_IDS: Record<string, string> = {
  parca: '76561198301504889',
  peter: '76561198041309771',
  doda: '76561199015608983',
  kevin: '76561198143673849',
  kike: '76561198415119986',
  fede: '76561198395532972',
  porco: '76561199790384537',
  xuiz: 'blackyolo22',
};

const FACEIT_URLS: Record<string, string> = {
  parca: 'https://www.faceit.com/en/players/parca16',
  peter: 'https://www.faceit.com/en/players/selav28',
  doda: 'https://www.faceit.com/en/players/niturbo',
  kevin: 'https://www.faceit.com/en/players/Kevimuxx69',
  kike: 'https://www.faceit.com/en/players/Kakii145',
  fede: 'https://www.faceit.com/en/players/danielo9',
  porco: 'https://www.faceit.com/en/players/PuercoManco',
  xuiz: 'https://www.faceit.com/en/players/Blackyolo22',
};

const ABBREVIATIONS: Record<string, string> = {
  parca: 'Parca',
  peter: 'Peter',
  doda: 'Dida',
  kevin: 'Kevs',
  kike: 'Kike',
  fede: 'Fede',
  porco: 'Porco',
  xuiz: 'Xuiz',
};

function isLightColor(hexColor?: string): boolean {
  if (!hexColor) return false;
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

function resolveSteamUrl(alias: string): string | undefined {
  const id = STEAM_IDS[alias];
  if (!id) return undefined;
  return id.startsWith('7656')
    ? `https://steamcommunity.com/profiles/${id}`
    : `https://steamcommunity.com/id/${id}`;
}

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  readonly player = input.required<Player>();
  protected activeTab: 'perfil' | 'posicion' | 'virtudes' | 'psico' | 'stats' = 'perfil';

  protected readonly steamUrl = computed(() => resolveSteamUrl(this.player().alias));
  protected readonly faceitUrl = computed(() => FACEIT_URLS[this.player().alias] || '');
  protected readonly abbrev = computed(() => ABBREVIATIONS[this.player().alias] || this.player().alias);
  protected readonly objectPosition = computed(() =>
    this.player().alias === 'parca' ? 'center 60%' : 'center center'
  );
  protected readonly lightBorderColor = computed(() => isLightColor(this.player().borderColor));

  protected selectTab(tab: 'perfil' | 'posicion' | 'virtudes' | 'psico' | 'stats') {
    this.activeTab = tab;
  }
}
