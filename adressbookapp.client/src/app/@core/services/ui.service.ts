import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private _snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,){}


  notify(message: string, action: string = 'Close', duration: number = 5000) {
    if (message !== undefined && message !== null && message !== '') {
      this.zone.run(() => {
        this._snackBar.open(message, action, {
          duration
        });
      });
    }
  }

  startLoading() {
    this.loading$.next(true);
  }
  stopLoading() {
    this.loading$.next(false);
  }
  toggleLoading() {
    this.loading$.next(!this.loading$.getValue());
  }

  public navigateHome() {
    this.router.navigate(['/']);
  }
}
