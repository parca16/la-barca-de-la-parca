import { Component, Input } from '@angular/core';
import { MapConfig } from '../data/map-config.interface';

@Component({
  selector: 'app-map-content',
  templateUrl: './map-content.html',
  styleUrl: './map-content.css',
  standalone: true,
})
export class MapContentComponent {
  @Input() mapData!: MapConfig;
  protected selectedSide: 'T' | 'CT' = 'T';

  get filteredStrategies(): MapConfig['strategies'] {
    return this.mapData.strategies.filter((s: { side: string }) => s.side === this.selectedSide);
  }

  selectSide(side: 'T' | 'CT'): void {
    this.selectedSide = side;
  }
}