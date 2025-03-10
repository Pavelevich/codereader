import { Component } from '@angular/core';
import {ScannerComponent} from './scanner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ScannerComponent
  ],
})
export class AppComponent {
  title = '';
}
