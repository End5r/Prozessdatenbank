import { Component, signal } from '@angular/core';
import { ProcessTable } from './components/process-table/process-table';
import { ProcessForm } from './components/process-form/process-form';
@Component({
  imports: [ProcessTable, ProcessForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
