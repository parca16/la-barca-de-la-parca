import { Component } from '@angular/core';
import { strategies } from '../../data/models/strategies.mock';

@Component({
  imports: [],
  selector: 'app-strategies',
  templateUrl: './strategies.html',
  styleUrl: './strategies.css',
})
export class Strategies {
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