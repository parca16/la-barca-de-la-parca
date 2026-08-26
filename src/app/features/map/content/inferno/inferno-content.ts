import { Component } from '@angular/core';
import { strategies } from '../../../../data/models/strategies.mock';
import { Strategy } from '../../../../data/models/strategy.interface';

@Component({
  imports: [],
  selector: 'app-inferno-content',
  templateUrl: './inferno-content.html',
  styleUrl: './inferno-content.css',
})
export class InfernoContent {
  protected readonly infernoStrategies: Strategy[] = strategies.filter(
    (s: Strategy) => s.map === 'Inferno'
  );

  protected selectedSide: 'T' | 'CT' = 'T';

  get filteredStrategies(): Strategy[] {
    return this.infernoStrategies.filter((s) => s.side === this.selectedSide);
  }

  selectSide(side: 'T' | 'CT'): void {
    this.selectedSide = side;
  }
}
