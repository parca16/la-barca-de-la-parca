import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MapConfig } from '../data/map-config.interface';
import { StrategyCard } from '../strategy-card/strategy-card';

@Component({
  imports: [StrategyCard],
  selector: 'app-map-content',
  templateUrl: './map-content.html',
  styleUrl: './map-content.css',
})
export class MapContentComponent {
  @Input() mapData!: MapConfig;
  @Input() mapName = '';
  @Input() mapKey = '';
  protected selectedSide: 'T' | 'CT' = 'T';

  private readonly router = inject(Router);

  get filteredStrategies(): MapConfig['strategies'] {
    return this.mapData.strategies.filter((s: { side: string }) => s.side === this.selectedSide);
  }

  selectSide(side: 'T' | 'CT'): void {
    this.selectedSide = side;
  }

  navigateToUtilities(): void {
    this.router.navigate(['/utilities', this.mapKey]);
  }
}
