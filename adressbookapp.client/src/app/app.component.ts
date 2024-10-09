import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';
import { UIService } from './@core/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private sub2: Subscription;
  public showOverlay = false;

  constructor(
    private uiService: UIService) {
    this.sub2 = this.uiService.loading$
      .pipe(debounceTime(200))
      .subscribe((isLoading: boolean) => {
        this.showOverlay = isLoading;
      });
  }

  ngOnDestroy() {
    if (!this.sub2.closed) this.sub2.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
