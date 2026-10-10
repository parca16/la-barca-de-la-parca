import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { StatsService } from '../../core/stats/stats.service';
import { PlayerStats as PlayerStatsData } from '../../data/models/player-stats.interface';

interface StatsKpiView {
  label: string;
  value: string;
  tone: 'pos' | 'neg' | null;
}

interface StatsSkillView {
  label: string;
  value: string;
  width: number;
}

interface StatsHighlightView {
  label: string;
  value: string;
}

interface StatsView {
  isPrivate: boolean;
  kpis: StatsKpiView[];
  skills: StatsSkillView[];
  highlights: StatsHighlightView[];
  syncedLabel: string;
}

const DASH = '—';
const intFormatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });
const signedFormatter = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'always',
});
const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const dateTimeFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

/** Formatea un número con `digits` decimales (coma española) o `—` si es null. */
function formatDecimal(value: number | null, digits: number): string {
  if (value === null) return DASH;
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/**
 * Pestaña "Estadísticas" de la tarjeta de jugador. Se instancia solo cuando la
 * pestaña está activa, así que carga al crearse y el `Card` no necesita gestionar
 * el estado de carga. Los valores se precalculan formateados (`view`).
 */
@Component({
  selector: 'app-player-stats',
  imports: [],
  templateUrl: './player-stats.html',
  styleUrl: './player-stats.css',
})
export class PlayerStats implements OnInit {
  readonly steam64Id = input.required<string>();

  private readonly statsService = inject(StatsService);

  protected readonly stats = signal<PlayerStatsData | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<'unauthorized' | 'generic' | null>(null);

  protected readonly view = computed<StatsView | null>(() => this.buildView(this.stats()));

  ngOnInit(): void {
    const steam64Id = this.steam64Id();
    if (!steam64Id) {
      this.loading.set(false);
      return;
    }

    this.statsService.get(steam64Id).subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        const status = error instanceof HttpErrorResponse ? error.status : 0;
        this.error.set(status === 401 ? 'unauthorized' : 'generic');
        this.loading.set(false);
      },
    });
  }

  /** Precalcula los valores ya formateados para no trabajar en la plantilla. */
  private buildView(stats: PlayerStatsData | null): StatsView | null {
    if (!stats) return null;

    const skillWidth = (value: number | null): number =>
      value === null ? 0 : Math.max(0, Math.min(100, value));

    const rating = stats.leetifyRating;
    const pin = (value: number | null, digits: number, suffix = ''): string => {
      const text = formatDecimal(value, digits);
      return text === DASH ? DASH : `${text}${suffix}`;
    };

    return {
      isPrivate: stats.privacyMode !== 'public',
      kpis: [
        {
          label: 'Premier',
          value: stats.premier === null ? DASH : intFormatter.format(stats.premier),
          tone: null,
        },
        {
          label: 'Rating Leetify',
          value: rating === null ? DASH : signedFormatter.format(rating),
          tone: rating === null ? null : rating > 0 ? 'pos' : rating < 0 ? 'neg' : null,
        },
        { label: 'KDA', value: formatDecimal(stats.kda, 2), tone: null },
      ],
      skills: [
        {
          label: 'Aim',
          value: formatDecimal(stats.skills.aim, 1),
          width: skillWidth(stats.skills.aim),
        },
        {
          label: 'Posicionamiento',
          value: formatDecimal(stats.skills.positioning, 1),
          width: skillWidth(stats.skills.positioning),
        },
        {
          label: 'Utilidad',
          value: formatDecimal(stats.skills.utility, 1),
          width: skillWidth(stats.skills.utility),
        },
      ],
      highlights: [
        {
          label: 'Pre-aim',
          value: pin(stats.highlights.crosshairPlacement, 1, '°'),
        },
        { label: 'HS%', value: pin(stats.highlights.headshotPct, 1, ' %') },
        {
          label: 'Utilidad sin usar',
          value:
            stats.highlights.utilityOnDeath === null
              ? DASH
              : intFormatter.format(stats.highlights.utilityOnDeath),
        },
        {
          label: 'Counterstrafing',
          value: pin(stats.highlights.counterStrafingPct, 1, ' %'),
        },
        { label: 'ADR', value: formatDecimal(stats.highlights.adr, 1) },
        { label: 'Spray accuracy', value: pin(stats.highlights.sprayAccuracyPct, 1, ' %') },
      ],
      syncedLabel: this.formatSynced(stats.syncedAt),
    };
  }

  private formatSynced(syncedAt: string): string {
    const date = new Date(syncedAt);
    if (Number.isNaN(date.getTime())) return DASH;
    const isToday = new Date().toDateString() === date.toDateString();
    return (isToday ? dateTimeFormatter : dateFormatter).format(date);
  }
}
