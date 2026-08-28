import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected isMenuOpen = false;
  protected isSolid = false;
  private subscriptions = new Subscription();

  protected readonly navItems: { label: string; route: string }[] = [
    { label: 'Inicio', route: '' },
    { label: 'Equipo', route: 'team' },
    { label: 'Estrategias', route: 'strategies' },
    { label: 'Utilidades', route: 'utilities' },
  ];

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.scrollService.hasScroll$.subscribe(solid => {
        this.isSolid = solid;
      })
    );
    this.scrollService.observeScroll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}