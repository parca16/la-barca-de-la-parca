import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { ClassVideo } from '../../../data/models/content.interface';
import { getMap } from '../../../data/models/maps';
import { youtubeEmbedUrl, youtubeThumbnail, youtubeWatchUrl } from '../../../shared/youtube';
import { ContentsService } from '../contents.service';

@Component({
  selector: 'app-content-detail',
  imports: [RouterLink],
  templateUrl: './content-detail.html',
  styleUrl: './content-detail.css',
})
export class ContentDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ContentsService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly dateFormatter = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  protected readonly video = signal<ClassVideo | null>(null);
  protected readonly loading = signal(true);
  protected readonly playing = signal(false);

  protected readonly thumbnail = computed(() => {
    const video = this.video();
    return video ? youtubeThumbnail(video.youtubeId) : '';
  });
  protected readonly dateLabel = computed(() => {
    const video = this.video();
    return video ? this.dateFormatter.format(new Date(`${video.date}T00:00:00`)) : '';
  });
  protected readonly mapLabel = computed(() => {
    const video = this.video();
    if (!video?.map) return null;
    return getMap(video.map)?.name ?? video.map;
  });
  protected readonly tagList = computed(() => this.video()?.tags ?? []);
  protected readonly watchUrl = computed(() => {
    const video = this.video();
    return video ? youtubeWatchUrl(video.youtubeId) : '';
  });
  /** El iframe solo se construye tras el primer clic (patrón facade). */
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const video = this.video();
    if (!video || !this.playing()) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl(video.youtubeId));
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.loading.set(true);
      this.playing.set(false);

      this.service.list().subscribe({
        next: (classes) => {
          const found = classes.find((item) => item.id === id) ?? null;
          if (!found) {
            void this.router.navigate(['/contents']);
            return;
          }
          this.video.set(found);
          this.loading.set(false);
        },
        error: () => {
          void this.router.navigate(['/contents']);
        },
      });
    });
  }

  protected play(): void {
    if (this.video()) this.playing.set(true);
  }
}
