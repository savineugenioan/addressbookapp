import { Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationError, Event } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  constructor(private injector: Injector, private router: Router) {
    // Listen to the navigation errors
    this.router.events.subscribe((event: Event) => {
      // Redirect to the ErrorComponent
      if (event instanceof NavigationError) {
        if (!navigator.onLine) {
          return;
        }
        // Redirect to the ErrorComponent
        const errorWithContext = this.log(event.error);
      }
    });
  }

  log(error: Error | HttpErrorResponse) {
    // Log the error to the console
    // console.error(error);

    // Send error to server
    const errorToSend = this.addContextInfo(error);
    return errorToSend;
  }

  addContextInfo(error: Error | HttpErrorResponse | any) {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const version = environment.version;
    const appId = 'AddressBookApp';
    const name = error.name || null;
    const time = new Date().getTime();
    const id = `${appId}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';

    let status = null;
    if (error instanceof HttpErrorResponse) {
      status = error.status || null;
    }

    const message = error.error?.error_description || error.message || error.toString();

    const errorToSend = {
      name,
      appId,
      version,
      time,
      url,
      message,
      status,
      id,
      error
    };
    return errorToSend;
  }
}
