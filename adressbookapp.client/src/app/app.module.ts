import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddressBookComponent } from './pages/address-book/address-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PersonDialogComponent } from './@shared/components/person-dialog/person-dialog.component';
import { ErrorsModule } from './@shared/errors.module';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    PersonDialogComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule,	SharedModule, AppRoutingModule, ErrorsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
