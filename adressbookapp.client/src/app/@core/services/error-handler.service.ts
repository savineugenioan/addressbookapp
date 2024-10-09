import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UIService } from 'src/app/@core/services/ui.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const uiService = this.injector.get(UIService);

    if (error instanceof HttpErrorResponse) {
      // Server error happened
      if (!navigator.onLine) {
        return uiService.notify('No Internet Connection', 'Close', 4000);
      }

      // Http Error
      console.log(error);

      return uiService.notify(
        `Error ${error.status} - ${error.statusText} \n\r ${error.url} `,
        'Close',
        4000
      );
    } else {
      // Client Error Happend
      console.log(error);
    }
  }
}
