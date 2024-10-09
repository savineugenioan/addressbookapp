import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/layout/footer.component";
import { HeaderComponent } from "./components/layout/header.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
