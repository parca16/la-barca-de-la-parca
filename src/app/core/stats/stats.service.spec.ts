import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PlayerStats } from '../../data/models/player-stats.interface';
import { StatsService } from './stats.service';

const mockStats: PlayerStats = {
  steam64Id: '76561198301504889',
  name: 'Kevs',
  privacyMode: 'public',
  syncedAt: '2026-10-09T12:00:00.000Z',
  premier: 21983,
  leetifyRating: 1.14,
  kda: 1.39,
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

describe('StatsService', () => {
  let service: StatsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StatsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('pide las stats del SteamID64 indicado', () => {
    let received: PlayerStats | undefined;
    service.get(mockStats.steam64Id).subscribe((stats) => (received = stats));

    http.expectOne(`/api/stats/${mockStats.steam64Id}`).flush({ stats: mockStats });
    expect(received).toEqual(mockStats);
  });

  it('cachea el resultado y no repite la petición', () => {
    service.get(mockStats.steam64Id).subscribe();
    http.expectOne(`/api/stats/${mockStats.steam64Id}`).flush({ stats: mockStats });

    let second: PlayerStats | undefined;
    service.get(mockStats.steam64Id).subscribe((stats) => (second = stats));
    http.expectNone(`/api/stats/${mockStats.steam64Id}`);
    expect(second).toEqual(mockStats);
  });
});
