import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MapConfig } from '../data/map-config.interface';

@Component({
  imports: [],
  selector: 'app-map-content',
  templateUrl: './map-content.html',
  styleUrl: './map-content.css',
  standalone: true,
})
export class MapContentComponent {
  @Input() mapData!: MapConfig;
  @Input() mapName: string = '';
  @Input() mapKey: string = '';
  protected selectedSide: 'T' | 'CT' = 'T';
  protected activeVariant: Record<string, number> = {};

  constructor(private router: Router) {}

  get filteredStrategies(): MapConfig['strategies'] {
    return this.mapData.strategies.filter((s: { side: string }) => s.side === this.selectedSide);
  }

  selectSide(side: 'T' | 'CT'): void {
    this.selectedSide = side;
  }

  variantIndex(name: string): number {
    return this.activeVariant[name] ?? 0;
  }

  selectVariant(name: string, index: number): void {
    this.activeVariant = { ...this.activeVariant, [name]: index };
  }

  navigateToUtilities(): void {
    this.router.navigate(['/utilities', this.mapKey]);
  }
}