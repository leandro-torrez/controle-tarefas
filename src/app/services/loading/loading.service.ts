import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  private totalRequest = 0;

  show() {
    this.totalRequest++;
    if (this.totalRequest === 1) {
      this.loading.next(true);
    }
  }

  hide() {
    this.totalRequest--;
    this.loading.next(false);
  }
}
