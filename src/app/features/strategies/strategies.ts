import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getMapsByPool } from '../../data/models/maps';

@Component({
  imports: [],
  selector: 'app-strategies',
  templateUrl: './strategies.html',
  styleUrl: './strategies.css',
})
export class Strategies {
  private router = inject(Router);

  protected readonly activePool = getMapsByPool('active');
  protected readonly inactivePool = getMapsByPool('inactive');

  navigateToMap(key: string): void {
    this.router.navigate(['/map', key]);
  }
}
