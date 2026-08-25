import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { strategies } from '../../data/models/strategies.mock';

@Component({
  imports: [],
  selector: 'app-strategies',
  templateUrl: './strategies.html',
  styleUrl: './strategies.css',
})
export class Strategies {
  private router = inject(Router);
  protected readonly strategies = strategies;
  protected selectedMap = 'All';

  protected readonly availableMaps: string[] = [
    'All',
    'Dust 2',
    'Mirage',
    'Inferno',
    'Nuke',
    'Ancient',
    'Anubis',
  ];

  protected readonly strategyMapNames: string[] = [
    'Dust 2',
    'Mirage',
    'Inferno',
    'Nuke',
    'Ancient',
    'Anubis',
    'Overpass',
    'Train',
    'Vertigo',
  ];

  selectMap(map: string): void {
    if (map !== 'All') {
      this.selectedMap = map;
      this.router.navigate(['/strategies']);
    }
  }

  get filteredStrategies() {
    if (this.selectedMap === 'All') return this.strategies;
    return this.strategies.filter((s) => s.map === this.selectedMap);
  }

  get groupedBySide() {
    const filtered = this.filteredStrategies;
    return {
      CT: filtered.filter((s) => s.side === 'CT'),
      T: filtered.filter((s) => s.side === 'T'),
    };
  }
}