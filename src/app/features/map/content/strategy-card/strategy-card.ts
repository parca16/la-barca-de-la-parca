import { Component, Input } from '@angular/core';
import { MapConfig } from '../data/map-config.interface';
import { imageVariant } from '../../../../shared/image-utils';

type Strategy = MapConfig['strategies'][number];

/**
 * Una estrategia del mapa: cabecera con bando, descripción, variantes,
 * minimapas y tabla de roles. Encapsula su propio estado de variante activa.
 */
@Component({
  imports: [],
  selector: 'app-strategy-card',
  templateUrl: './strategy-card.html',
  styleUrl: './strategy-card.css',
})
export class StrategyCard {
  @Input({ required: true }) strategy!: Strategy;
  @Input() index = 0;

  protected activeVariant = 0;

  protected selectVariant(variant: number): void {
    this.activeVariant = variant;
  }

  /** `srcset` de un minimapa: variante 480w + original. */
  protected minimapSrcset(path: string): string {
    if (!path) return '';
    return `${imageVariant(path, 480)} 480w, ${path} 710w`;
  }
}
