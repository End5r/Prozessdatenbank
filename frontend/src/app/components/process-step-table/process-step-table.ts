import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';
import { MatCardContent, MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  imports: [MatCardContent, MatCard, MatCardHeader, MatCardTitle],
  selector: 'app-process-step-table',
  styleUrl: './process-step-table.css',
  templateUrl: './process-step-table.html',
})
export class ProcessStepTable {
  private readonly processService = inject(Process);
  
  readonly processStepData = this.processService.processStepData;
  readonly processStepList = this.processService.processStepData.value;
  
}
