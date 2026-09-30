import { Component } from '@angular/core';
import { getMapsByPool } from '../../data/models/maps';
import { MapPoolGrid } from '../../shared/map-pool-grid/map-pool-grid';

@Component({
  imports: [MapPoolGrid],
  selector: 'app-strategies',
  templateUrl: './strategies.html',
  styleUrl: './strategies.css',
})
export class Strategies {
  protected readonly activePool = getMapsByPool('active');
  protected readonly inactivePool = getMapsByPool('inactive');
}
