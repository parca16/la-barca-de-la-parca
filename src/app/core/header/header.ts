import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected isMenuOpen = false;
  protected isSolid = false;
  protected currentRoute = '';
  private subscriptions = new Subscription();

  protected readonly navItems: { label: string; route: string; activateOn?: string[] }[] = [
    { label: 'Inicio', route: '', activateOn: [''] },
    { label: 'Equipo', route: 'team', activateOn: ['team'] },
    { label: 'Estrategias', route: 'strategies', activateOn: ['strategies', 'map'] },
    { label: 'Utilidades', route: 'utilities', activateOn: ['utilities'] },
  ];

  constructor(
    private scrollService: ScrollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.scrollService.hasScroll$.subscribe(solid => {
        this.isSolid = solid;
      })
    );
    this.scrollService.observeScroll();

    this.subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects.split('/')[1] || '';
        window.scrollTo(0, 0);
      })
    );
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected isActive(route: string, activateOn?: string[]): boolean {
    if (!activateOn || activateOn.length === 0) return false;
    return activateOn.includes(this.currentRoute);
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