import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription, filter, fromEvent } from 'rxjs';

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
  private scrollSubscription: Subscription = Subscription.EMPTY;

  protected readonly navItems: { label: string; route: string; activateOn?: string[] }[] = [
    { label: 'Inicio', route: '', activateOn: [''] },
    { label: 'Equipo', route: 'team', activateOn: ['team'] },
    { label: 'Estrategias', route: 'strategies', activateOn: ['strategies', 'map'] },
    { label: 'Utilidades', route: 'utilities', activateOn: ['utilities'] },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
      this.isSolid = window.scrollY > 400;
      this.cdr.markForCheck();
    });

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
    this.scrollSubscription.unsubscribe();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}