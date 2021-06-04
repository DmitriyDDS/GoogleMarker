import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GoogleComponent } from './google/google.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  exports : [
    GoogleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
