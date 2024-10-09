import { NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from '../@core/services/error-handler.service';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [SharedModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class ErrorsModule {}
