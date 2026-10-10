import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Player } from '../../data/models/player.interface';
import { PlayerStats } from '../../data/models/player-stats.interface';
import { Card } from './card';

const mockPlayer: Player = {
  name: 'Alejo "Parca" Rivas',
  alias: 'parca',
  role: 'IGL',
  nationality: 'Egipto',
  age: 51,
  photoUrl: '/assets/players/Parca16.webp',
  borderColor: '#E9FF1F',
  abbrev: 'Parca',
  steamUrl: 'https://steamcommunity.com/profiles/76561198301504889',
  steam64Id: '76561198301504889',
  faceitUrl: 'https://www.faceit.com/en/players/parca16',
  photoPosition: 'center 60%',
  posicionDesc: 'El cerebro del equipo.',
  virtudes: ['Liderazgo'],
  defectos: ['Headshots'],
  perfilPsicologico: 'Estable y metódico.',
};

const mockStats: PlayerStats = {
  steam64Id: '76561198301504889',
  name: 'Kevs',
  privacyMode: 'public',
  syncedAt: '2026-10-09T12:00:00.000Z',
  premier: 21983,
  leetifyRating: 1.14,
  kd: 1.39,
  winrate: 0.6333,
  totalMatches: 1950,
  skills: { aim: 79.95, positioning: 66.27, utility: 60.89 },
  highlights: {
    crosshairPlacement: 10.27,
    headshotPct: 23.35,
    utilityOnDeath: 488.59,
    counterStrafingPct: 81.01,
    adr: 88.1,
    sprayAccuracyPct: 45.85,
  },
};

describe('Card', () => {
  function createCard(player: Player = mockPlayer) {
    const fixture = TestBed.createComponent(Card);
    fixture.componentRef.setInput('player', player);
    fixture.detectChanges();
    return fixture;
  }

  function openStatsTab(fixture: ReturnType<typeof createCard>) {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.segmented-btn');
    buttons[4].click();
    fixture.detectChanges();
    return compiled;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the card', () => {
    const fixture = createCard();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the profile tab by default', () => {
    const fixture = createCard();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tab-perfil .value')?.textContent).toContain(mockPlayer.name);
  });

  it('should switch the active tab when a toggle is clicked', () => {
    const fixture = createCard();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.segmented-btn');

    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance['activeTab']).toBe('posicion');
    expect(compiled.querySelector('.tab-posicion')?.textContent).toContain(mockPlayer.posicionDesc);
  });

  it('should render the Steam and FACEIT links from the player data', () => {
    const compiled = createCard().nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-link-steam')?.getAttribute('href')).toBe(
      mockPlayer.steamUrl,
    );
    expect(compiled.querySelector('.profile-link-faceit')?.getAttribute('href')).toBe(
      mockPlayer.faceitUrl,
    );
  });

  it('should mark light border colors with the role-light-bg class', () => {
    const light = createCard({ ...mockPlayer, borderColor: '#ffffff' })
      .nativeElement as HTMLElement;
    expect(light.querySelector('.role-badge')?.classList.contains('role-light-bg')).toBe(true);

    const dark = createCard({ ...mockPlayer, borderColor: '#000000' }).nativeElement as HTMLElement;
    expect(dark.querySelector('.role-badge')?.classList.contains('role-light-bg')).toBe(false);
  });

  it('should request and render the player stats when opening the stats tab', () => {
    const fixture = createCard();
    const http = TestBed.inject(HttpTestingController);
    const compiled = openStatsTab(fixture);

    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain('Cargando');

    http.expectOne(`/api/stats/${mockPlayer.steam64Id}`).flush({ stats: mockStats });
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.stats-kpi').length).toBe(3);
    expect(compiled.querySelectorAll('.stats-skill').length).toBe(3);
    expect(compiled.querySelectorAll('.stats-cell').length).toBe(6);
    expect(compiled.querySelector('.stats-attribution')?.textContent).toContain('Leetify');
    http.verify();
  });

  it('should show an error message when the stats request fails', () => {
    const fixture = createCard();
    const http = TestBed.inject(HttpTestingController);
    const compiled = openStatsTab(fixture);

    http
      .expectOne(`/api/stats/${mockPlayer.steam64Id}`)
      .flush('boom', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain(
      'No se pudieron cargar',
    );
  });

  it('should show the private profile message when Leetify hides the data', () => {
    const fixture = createCard();
    const http = TestBed.inject(HttpTestingController);
    const compiled = openStatsTab(fixture);

    http
      .expectOne(`/api/stats/${mockPlayer.steam64Id}`)
      .flush({ stats: { ...mockStats, privacyMode: 'private' } });
    fixture.detectChanges();

    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain(
      'Perfil privado en Leetify',
    );
  });

  it('should not call the API twice for the same player', () => {
    const fixture = createCard();
    const http = TestBed.inject(HttpTestingController);
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.segmented-btn');

    openStatsTab(fixture);
    http.expectOne(`/api/stats/${mockPlayer.steam64Id}`).flush({ stats: mockStats });
    fixture.detectChanges();

    // Volver al perfil y reabrir la pestaña de stats no debe repetir la llamada
    // (el componente se recrea, pero el servicio cachea el resultado).
    buttons[0].click();
    fixture.detectChanges();
    openStatsTab(fixture);
    http.expectNone(`/api/stats/${mockPlayer.steam64Id}`);
  });
});
