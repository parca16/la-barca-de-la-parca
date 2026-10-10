import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PlayerStats as PlayerStatsData } from '../../data/models/player-stats.interface';
import { PlayerStats } from './player-stats';

const STEAM64 = '76561198301504889';

const mockStats: PlayerStatsData = {
  steam64Id: STEAM64,
  name: 'Kevs',
  privacyMode: 'public',
  syncedAt: '2020-01-01T12:00:00.000Z',
  premier: 21983,
  leetifyRating: 1.14,
  kd: 1.06,
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

describe('PlayerStats', () => {
  let http: HttpTestingController;

  function create(stats: Partial<PlayerStatsData> = {}) {
    const fixture = TestBed.createComponent(PlayerStats);
    fixture.componentRef.setInput('steam64Id', STEAM64);
    fixture.detectChanges();
    http = TestBed.inject(HttpTestingController);
    http.expectOne(`/api/stats/${STEAM64}`).flush({ stats: { ...mockStats, ...stats } });
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerStats],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renderiza los 3 KPIs, 3 barras y 6 métricas', () => {
    const compiled = create();
    expect(compiled.querySelectorAll('.stats-kpi').length).toBe(3);
    expect(compiled.querySelectorAll('.stats-skill').length).toBe(3);
    expect(compiled.querySelectorAll('.stats-cell').length).toBe(6);
    expect(compiled.querySelector('.stats-attribution')?.textContent).toContain('Datos: Leetify');
  });

  it('formatea los valores en es-ES', () => {
    const compiled = create();
    const values = Array.from(compiled.querySelectorAll('.stats-kpi-value')).map((el) =>
      el.textContent?.trim(),
    );
    expect(values).toEqual(['21.983', '+1,14', '1,06']);
    const kpiLabels = Array.from(compiled.querySelectorAll('.stats-kpi-label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(kpiLabels).toContain('K/D');
  });

  it('etiqueta correctamente preaim y utilidad sin usar', () => {
    const compiled = create();
    const labels = Array.from(compiled.querySelectorAll('.stats-cell-label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toContain('Pre-aim');
    expect(labels).toContain('Utilidad sin usar');
    expect(labels).not.toContain('Daño utilidad');
  });

  it('muestra un guion cuando faltan datos y el rating negativo en rojo', () => {
    const compiled = create({ premier: null, leetifyRating: -0.5 });
    const kpis = compiled.querySelectorAll('.stats-kpi-value');
    expect(kpis[0].textContent?.trim()).toBe('—');
    expect(kpis[1].textContent?.trim()).toBe('-0,50');
    expect(kpis[1].classList.contains('neg')).toBe(true);
  });

  it('muestra el mensaje de perfil privado', () => {
    const compiled = create({ privacyMode: 'private' });
    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain(
      'Perfil privado en Leetify',
    );
  });

  it('muestra un error si la petición falla', () => {
    const fixture = TestBed.createComponent(PlayerStats);
    fixture.componentRef.setInput('steam64Id', STEAM64);
    fixture.detectChanges();
    http = TestBed.inject(HttpTestingController);
    http.expectOne(`/api/stats/${STEAM64}`).flush('boom', { status: 500, statusText: 'Error' });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain(
      'No se pudieron cargar',
    );
  });

  it('muestra el aviso de sesión cuando el endpoint responde 401', () => {
    const fixture = TestBed.createComponent(PlayerStats);
    fixture.componentRef.setInput('steam64Id', STEAM64);
    fixture.detectChanges();
    http = TestBed.inject(HttpTestingController);
    http
      .expectOne(`/api/stats/${STEAM64}`)
      .flush({ error: 'unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain(
      'Inicia sesión para ver las estadísticas',
    );
  });

  it('no pide nada si no hay SteamID64', () => {
    const fixture = TestBed.createComponent(PlayerStats);
    fixture.componentRef.setInput('steam64Id', '');
    fixture.detectChanges();
    http = TestBed.inject(HttpTestingController);
    http.expectNone(`/api/stats/`);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tab-stats-state')?.textContent).toContain('Sin datos');
  });
});
