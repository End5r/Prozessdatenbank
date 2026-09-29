import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';

@Component({
  imports: [],
  selector: 'app-process-table',
  styleUrl: './process-table.css',
  templateUrl: './process-table.html',
})
export class ProcessTable {
  private readonly processService = inject(Process);
  
  readonly processList = this.processService.processList;
}
