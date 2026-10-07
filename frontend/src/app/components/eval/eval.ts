import { Component, computed, inject } from '@angular/core';
import { Orders } from '../../services/orders';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  imports: [MatCard, MatCardContent],
  selector: 'app-eval',
  styleUrl: './eval.css',
  templateUrl: './eval.html',
})
export class Eval {
  private readonly ordersService = inject(Orders);

  readonly evaluationData = this.ordersService.evalData;
  readonly evaluationValue = this.ordersService.evalData.value;

  readonly needsToBeProduced = computed( () => {
    const value = this.evaluationValue();
    if (!value) return 0;
    return Math.max(0,value.ordered - value.produced);
  });
}
