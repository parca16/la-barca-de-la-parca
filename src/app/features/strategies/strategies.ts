import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-strategies',
  templateUrl: './strategies.html',
  styleUrl: './strategies.css',
})
export class Strategies {
  private router = inject(Router);

  protected readonly activePool = [
    { name: 'Dust 2', key: 'dust-2', image: '/assets/maps/Dust2.webp' },
    { name: 'Mirage', key: 'mirage', image: '/assets/maps/Mirage.webp' },
    { name: 'Inferno', key: 'inferno', image: '/assets/maps/Inferno.webp' },
    { name: 'Nuke', key: 'nuke', image: '/assets/maps/Nuke.webp' },
    { name: 'Ancient', key: 'ancient', image: '/assets/maps/Ancient.webp' },
    { name: 'Anubis', key: 'anubis', image: '/assets/maps/Anubis.webp' },
    { name: 'Cache', key: 'cache', image: '/assets/maps/Cache.webp' },
  ];

  protected readonly inactivePool = [
    { name: 'Overpass', key: 'overpass', image: '/assets/maps/Overpass.webp' },
    { name: 'Vertigo', key: 'vertigo', image: '/assets/maps/Vertigo.webp' },
    { name: 'Train', key: 'train', image: '/assets/maps/Train.webp' },
  ];

  navigateToMap(key: string): void {
    this.router.navigate(['/map', key]);
  }
}
