import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Header } from './header';

describe('Header', () => {
  let routerEvents: Subject<NavigationEnd>;
  let cdr: { markForCheck: ReturnType<typeof vi.fn> };
  let header: Header | undefined;

  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', { value, configurable: true });
  };

  const createHeader = (): Header => {
    routerEvents = new Subject<NavigationEnd>();
    const router = { events: routerEvents.asObservable() } as unknown as Router;
    cdr = { markForCheck: vi.fn() };
    header = new Header(cdr as unknown as ChangeDetectorRef, router);
    header.ngOnInit();
    return header;
  };

  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    setScrollY(0);
  });

  afterEach(() => {
    header?.ngOnDestroy();
    header = undefined;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(createHeader()).toBeTruthy();
  });

  it('initializes isSolid from the current scroll position', () => {
    setScrollY(1000);
    createHeader();
    expect((header as unknown as { isSolid: boolean }).isSolid).toBe(true);
  });

  it('does not force scroll to top on NavigationEnd (the router restores scroll)', () => {
    createHeader();

    routerEvents.next(new NavigationEnd(1, '/team', '/team'));

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect((header as unknown as { currentRoute: string }).currentRoute).toBe('team');
  });

  it('updates isSolid (throttled) and only notifies when it changes', () => {
    vi.useFakeTimers();
    createHeader();
    const isSolid = () => (header as unknown as { isSolid: boolean }).isSolid;

    // Primer evento sin cruzar el umbral: no hay cambio ni notificación.
    setScrollY(100);
    window.dispatchEvent(new Event('scroll'));
    expect(isSolid()).toBe(false);
    expect(cdr.markForCheck).not.toHaveBeenCalled();

    // Al cruzar el umbral, el valor llega en el trailing edge del throttle.
    setScrollY(500);
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(100);
    expect(isSolid()).toBe(true);
    expect(cdr.markForCheck).toHaveBeenCalledTimes(1);

    // El mismo valor en eventos posteriores no vuelve a notificar.
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(100);
    expect(cdr.markForCheck).toHaveBeenCalledTimes(1);

    // Al bajar del umbral notifica de nuevo.
    setScrollY(100);
    window.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(100);
    expect(isSolid()).toBe(false);
    expect(cdr.markForCheck).toHaveBeenCalledTimes(2);
  });

  it('scrollToTop scrolls smoothly to the top', () => {
    createHeader();

    header?.scrollToTop();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('toggles the mobile menu open and closed', () => {
    const instance = createHeader();
    const isOpen = () => (instance as unknown as { isMenuOpen: boolean }).isMenuOpen;

    instance.toggleMenu();
    expect(isOpen()).toBe(true);

    instance.toggleMenu();
    expect(isOpen()).toBe(false);
  });

  it('closes the mobile menu on Escape', () => {
    const instance = createHeader();
    instance.toggleMenu();

    instance.onDocumentKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect((instance as unknown as { isMenuOpen: boolean }).isMenuOpen).toBe(false);
  });

  it('closes the mobile menu when clicking outside the header', () => {
    const instance = createHeader();
    instance.toggleMenu();

    instance.onDocumentClick({ target: document.createElement('div') } as unknown as MouseEvent);

    expect((instance as unknown as { isMenuOpen: boolean }).isMenuOpen).toBe(false);
  });

  it('keeps the mobile menu open when clicking inside the header', () => {
    const instance = createHeader();
    instance.toggleMenu();

    const headerElement = document.createElement('div');
    headerElement.classList.add('header');
    const child = document.createElement('button');
    headerElement.appendChild(child);

    instance.onDocumentClick({ target: child } as unknown as MouseEvent);

    expect((instance as unknown as { isMenuOpen: boolean }).isMenuOpen).toBe(true);
  });

  it('exposes aria-expanded and aria-controls on the menu toggle', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('.menu-toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-controls')).toBe('primary-navigation');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  describe('visibilidad del botón "volver arriba"', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Header],
        providers: [provideRouter([])],
      }).compileComponents();
    });

    const getButton = (fixture: { nativeElement: HTMLElement }): HTMLButtonElement =>
      fixture.nativeElement.querySelector('.back-to-top') as HTMLButtonElement;

    it('permanece oculto al principio de la página', () => {
      const fixture = TestBed.createComponent(Header);
      fixture.detectChanges();

      const button = getButton(fixture);
      expect(button.classList.contains('visible')).toBe(false);
      expect(button.getAttribute('aria-hidden')).toBe('true');
      expect(button.getAttribute('tabindex')).toBe('-1');
    });

    it('se muestra y es accesible tras superar el umbral de scroll', () => {
      vi.useFakeTimers();
      const fixture = TestBed.createComponent(Header);
      fixture.detectChanges();

      setScrollY(500);
      window.dispatchEvent(new Event('scroll'));
      vi.advanceTimersByTime(100);
      fixture.detectChanges();

      const button = getButton(fixture);
      expect(button.classList.contains('visible')).toBe(true);
      expect(button.getAttribute('aria-hidden')).toBeNull();
      expect(button.getAttribute('tabindex')).toBeNull();

      fixture.destroy();
    });
  });
});
