import { Component, signal } from '@angular/core';
import { ProcessTable } from './components/process-table/process-table';
@Component({
  imports: [ProcessTable],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
