import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Summary } from '../../services/summary';

@Component({
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, DatePipe],
  selector: 'app-weekly',
  styleUrl: './weekly.css',
  templateUrl: './weekly.html',
})
export class Weekly {
  private readonly summaryService = inject(Summary);

  readonly weeklySummaryData = this.summaryService.weeklySummaryData
  readonly weeklySummaryValue = this.weeklySummaryData.value 

  getHours(number: number){
    return (number / 60).toFixed(0)
  }

  getMinutes(number: number){
    return (number % 60)
  }
}
