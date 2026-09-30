import { Component, Input } from '@angular/core';
import { MapConfig } from '../data/map-config.interface';

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
}
