import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { sanitizeReturnTo } from './return-to';

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

/**
 * Estado de sesión del usuario. Carga `/api/auth/me` una sola vez y expone el
 * usuario como signal para que la app zoneless reaccione sin subscripciones.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userSignal = signal<AuthUser | null>(null);
  private loadPromise: Promise<void> | null = null;
  private loaded = false;

  readonly user = this.userSignal.asReadonly();

  /** Carga la sesión (idempotente). No lanza si no hay sesión. */
  load(): Promise<void> {
    if (this.loaded) return Promise.resolve();
    if (!this.loadPromise) {
      this.loadPromise = firstValueFrom(this.http.get<{ user: AuthUser }>('/api/auth/me'))
        .then((response) => {
          this.userSignal.set(response.user);
        })
        .catch(() => {
          this.userSignal.set(null);
        })
        .finally(() => {
          this.loaded = true;
          this.loadPromise = null;
        });
    }
    return this.loadPromise;
  }

  /** Espera a que la sesión esté cargada y devuelve el usuario (o null). */
  async ensureLoaded(): Promise<AuthUser | null> {
    await this.load();
    return this.userSignal();
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post('/api/auth/logout', {}));
    } catch {
      // Aunque falle la llamada, limpiamos el estado local.
    }
    this.userSignal.set(null);
  }

  /** URL de inicio de sesión, preservando la ruta de vuelta. */
  loginUrl(returnTo: string): string {
    return `/api/auth/login?returnTo=${encodeURIComponent(sanitizeReturnTo(returnTo))}`;
  }
}
