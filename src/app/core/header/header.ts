import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected isMenuOpen = false;

  protected readonly navItems: { label: string; route: string }[] = [
    { label: 'Inicio', route: '' },
    { label: 'Equipo', route: 'team' },
    { label: 'Mapas', route: 'maps' },
    { label: 'Estrategias', route: 'strategies' },
    { label: 'Roles', route: 'roles' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}