import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService implements OnDestroy {
  private hasScrollSubject = new BehaviorSubject<boolean>(false);
  private scrollSubscription = Subscription.EMPTY;

  readonly hasScroll$ = this.hasScrollSubject.asObservable();

  constructor() {}

  observeScroll(): void {
    this.scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
      this.hasScrollSubject.next(window.scrollY > 500);
    });
  }

  destroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}