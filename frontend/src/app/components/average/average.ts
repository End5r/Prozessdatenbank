import { Component, inject } from '@angular/core';
import { Process } from '../../services/process';

@Component({
  imports: [],
  selector: 'app-average',
  styleUrl: './average.css',
  templateUrl: './average.html',
})
export class Average {
  private readonly processStepService = inject(Process);

  readonly averageStepData = this.processStepService.averageStepData;
  readonly averageStepValue = this.processStepService.averageStepData.value;
}
