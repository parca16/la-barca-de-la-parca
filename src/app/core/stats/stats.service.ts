import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerStats } from '../../data/models/player-stats.interface';

/**
 * Acceso a las estadísticas de jugador (`GET /api/stats/:steam64`). Es privado:
 * el endpoint exige sesión. Se cachea en memoria por SteamID64 para no repetir
 * la llamada al abrir y cerrar la pestaña.
 */
@Injectable({ providedIn: 'root' })
export class StatsService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, PlayerStats>();

  get(steam64Id: string): Observable<PlayerStats> {
    const cached = this.cache.get(steam64Id);
    if (cached) return of(cached);

    return this.http.get<{ stats: PlayerStats }>(`/api/stats/${steam64Id}`).pipe(
      map((response) => response.stats),
      tap((stats) => {
        this.cache.set(steam64Id, stats);
      }),
    );
  }
}
