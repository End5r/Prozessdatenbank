import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';
import { DatePipe } from '@angular/common';
import { MatCardContent, MatCardTitle, MatCardHeader, MatCard } from '@angular/material/card';
//import { JsonPipe } from '@angular/common';

@Component({
  imports: [DatePipe, MatCardContent, MatCardTitle, MatCardHeader, MatCard],
  selector: 'app-process-table',
  styleUrl: './process-table.css',
  templateUrl: './process-table.html',
})
export class ProcessTable {
  private readonly processService = inject(Process);
  
  readonly processData = this.processService.processData;
  readonly processList = this.processService.processData.value;

  getHours(number: number){
    return (number / 60).toFixed(0)
  }

  getMinutes(number: number){
    return (number % 60)
  }
  
}
