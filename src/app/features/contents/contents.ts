import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClassVideo } from '../../data/models/content.interface';
import { youtubeThumbnail } from '../../shared/youtube';
import { ContentsService } from './contents.service';

/** Clase con los datos ya resueltos para pintar (evita recálculos en plantilla). */
interface ContentCardView extends ClassVideo {
  thumbnail: string;
  dateLabel: string;
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

  protected readonly cards = computed<ContentCardView[]>(() =>
    this.classes().map((video) => ({
      ...video,
      thumbnail: youtubeThumbnail(video.youtubeId),
      dateLabel: this.dateFormatter.format(new Date(`${video.date}T00:00:00`)),
    })),
  );

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
}
