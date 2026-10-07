import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClassVideo } from '../../data/models/content.interface';
import { getMap } from '../../data/models/maps';
import { youtubeThumbnail } from '../../shared/youtube';
import { collectMaps, collectTags, filterClasses } from './content-filters';
import { ContentsService } from './contents.service';

/** Clase con los datos ya resueltos para pintar (evita recálculos en plantilla). */
interface ContentCardView extends ClassVideo {
  thumbnail: string;
  dateLabel: string;
  mapLabel?: string;
  tagList: string[];
}

@Component({
  selector: 'app-contents',
  imports: [RouterLink],
  templateUrl: './contents.html',
  styleUrl: './contents.css',
})
export class Contents {
  private readonly service = inject(ContentsService);
  private readonly dateFormatter = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  protected readonly classes = signal<ClassVideo[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly selectedMap = signal<string | null>(null);
  protected readonly selectedTag = signal<string | null>(null);

  protected readonly mapOptions = computed(() =>
    collectMaps(this.classes()).map((key) => ({ key, label: getMap(key)?.name ?? key })),
  );
  protected readonly tagOptions = computed(() => collectTags(this.classes()));
  protected readonly filtered = computed<ContentCardView[]>(() => {
    const filters = { map: this.selectedMap(), tag: this.selectedTag() };
    return filterClasses(this.classes(), filters).map((video) => ({
      ...video,
      thumbnail: youtubeThumbnail(video.youtubeId),
      dateLabel: this.dateFormatter.format(new Date(`${video.date}T00:00:00`)),
      mapLabel: video.map ? (getMap(video.map)?.name ?? video.map) : undefined,
      tagList: video.tags ?? [],
    }));
  });

  constructor() {
    this.service.list().subscribe({
      next: (classes) => {
        this.classes.set(classes);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  protected toggleMap(key: string): void {
    this.selectedMap.update((current) => (current === key ? null : key));
  }

  protected toggleTag(tag: string): void {
    this.selectedTag.update((current) => (current === tag ? null : tag));
  }

  protected clearFilters(): void {
    this.selectedMap.set(null);
    this.selectedTag.set(null);
  }
}
