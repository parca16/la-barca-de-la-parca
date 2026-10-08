import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { ClassVideo } from '../../../data/models/content.interface';
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

  protected readonly video = signal<ClassVideo | null>(null);
  protected readonly loading = signal(true);
  protected readonly playing = signal(false);

  protected readonly thumbnail = computed(() => {
    const video = this.video();
    return video ? youtubeThumbnail(video.youtubeId) : '';
  });
  protected readonly watchUrl = computed(() => {
    const video = this.video();
    return video ? youtubeWatchUrl(video.youtubeId, video.startSeconds) : '';
  });
  /** El iframe solo se construye tras el primer clic (patrón facade). */
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const video = this.video();
    if (!video || !this.playing()) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      youtubeEmbedUrl(video.youtubeId, video.startSeconds),
    );
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
