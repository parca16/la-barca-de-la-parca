import { Component, computed, input } from '@angular/core';
import { Player } from '../../data/models/player.interface';

function isLightColor(hexColor?: string): boolean {
  if (!hexColor) return false;
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
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

  protected readonly lightBorderColor = computed(() => isLightColor(this.player().borderColor));

  protected selectTab(tab: 'perfil' | 'posicion' | 'virtudes' | 'psico' | 'stats') {
    this.activeTab = tab;
  }
}
