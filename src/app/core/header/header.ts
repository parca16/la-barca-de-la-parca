import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subscription, filter, fromEvent, map, throttleTime } from 'rxjs';

const SOLID_SCROLL_THRESHOLD = 400;
const SCROLL_THROTTLE_MS = 100;

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
    this.isSolid = window.scrollY > SOLID_SCROLL_THRESHOLD;

    // La restauración de scroll la gestiona exclusivamente el router
    // (withInMemoryScrolling en app.config.ts). No forzamos scroll aquí.
    this.subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects.split('/')[1] || '';
      })
    );

    // La app es zoneless, así que el listener corre siempre y notificamos a
    // Angular manualmente. Limitamos con throttleTime y solo llamamos a
    // markForCheck cuando `isSolid` cambia realmente (no en cada evento).
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(SCROLL_THROTTLE_MS, undefined, { leading: true, trailing: true }),
        map(() => window.scrollY > SOLID_SCROLL_THRESHOLD)
      )
      .subscribe(isSolid => {
        if (isSolid === this.isSolid) return;
        this.isSolid = isSolid;
        this.cdr.markForCheck();
      });
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
