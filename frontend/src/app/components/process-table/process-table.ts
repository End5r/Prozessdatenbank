import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';
import { DatePipe } from '@angular/common';
//import { JsonPipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-process-table',
  styleUrl: './process-table.css',
  templateUrl: './process-table.html',
})
export class ProcessTable {
  private readonly processService = inject(Process);
  
  readonly processData = this.processService.processData;
  readonly processList = this.processService.processData.value;
  
}
