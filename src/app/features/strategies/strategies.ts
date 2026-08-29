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
    { name: 'Dust 2', key: 'dust-2', image: '/assets/maps/Dust2.jpg' },
    { name: 'Mirage', key: 'mirage', image: '/assets/maps/Mirage.jpg' },
    { name: 'Inferno', key: 'inferno', image: '/assets/maps/Inferno.jpg' },
    { name: 'Nuke', key: 'nuke', image: '/assets/maps/Nuke.jpg' },
    { name: 'Ancient', key: 'ancient', image: '/assets/maps/Ancient.jpg' },
    { name: 'Anubis', key: 'anubis', image: '/assets/maps/Anubis.jpg' },
    { name: 'Cache', key: 'cache', image: '/assets/maps/Cache.jpg' },
  ];

  protected readonly inactivePool = [
    { name: 'Overpass', key: 'overpass', image: '/assets/maps/Overpass.jpg' },
    { name: 'Vertigo', key: 'vertigo', image: '/assets/maps/Vertigo.jpg' },
    { name: 'Train', key: 'train', image: '/assets/maps/Train.jpg' },
  ];

  navigateToMap(key: string): void {
    this.router.navigate(['/map', key]);
  }
}
