import { Component } from '@angular/core';
import { getMapsByPool } from '../../data/models/maps';
import { MapPoolGrid } from '../../shared/map-pool-grid/map-pool-grid';

@Component({
  imports: [MapPoolGrid],
  selector: 'app-utilities',
  templateUrl: './utilities.html',
  styleUrl: './utilities.css',
})
export class Utilities {
  protected readonly activePool = getMapsByPool('active');
  protected readonly inactivePool = getMapsByPool('inactive');
}
