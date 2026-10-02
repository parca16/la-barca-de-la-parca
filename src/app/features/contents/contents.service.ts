import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassVideo } from '../../data/models/content.interface';
import { sortClassesByDateDesc } from './content-filters';

/**
 * Acceso al listado de clases. Los datos son privados: viven detrás de
 * `GET /api/content/classes` (exige sesión). Se cachea el resultado en memoria
 * para no repetir la llamada al navegar entre listado y detalle.
 */
@Injectable({ providedIn: 'root' })
export class ContentsService {
  private readonly http = inject(HttpClient);
  private cache: ClassVideo[] | null = null;

  list(): Observable<ClassVideo[]> {
    if (this.cache) return of(this.cache);

    return this.http.get<{ classes: ClassVideo[] }>('/api/content/classes').pipe(
      map((response) => sortClassesByDateDesc(response.classes)),
      tap((classes) => {
        this.cache = classes;
      }),
    );
  }
}
