import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private hasScrollSubject = new BehaviorSubject<boolean>(false);

  readonly hasScroll$ = this.hasScrollSubject.asObservable();
  private scrollDistanceSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.scrollDistanceSubject.subscribe(distance => {
      this.hasScrollSubject.next(distance > 60);
    });
  }

  observeScroll(): void {
    window.addEventListener('scroll', () => {
      this.scrollDistanceSubject.next(window.scrollY);
    }, { passive: true });
  }

  reset(): void {
    this.scrollDistanceSubject.next(0);
  }
}