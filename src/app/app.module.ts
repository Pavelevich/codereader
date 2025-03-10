import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppComponent } from './app.component';
// @ts-ignore
import { ScannerComponent } from './scanner.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ZXingScannerModule,
    AppComponent,
    ScannerComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
