import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

export function getBaseUrl() {
  //only for demo for faster development
    return environment?.apiUrl ?? "http://localhost:5284/";
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
