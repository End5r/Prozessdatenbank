import { Component, signal } from '@angular/core';
import { ProcessTable } from './components/process-table/process-table';
import { ProcessForm } from './components/process-form/process-form';
import { ProcessStepForm } from './components/process-step-form/process-step-form';
import { ProcessStepTable } from './components/process-step-table/process-step-table';
import { OrdersForm } from './components/orders/orders-form/orders-form';
import { Eval } from './components/eval/eval';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCard } from '@angular/material/card';
import { Average } from './components/average/average';
import { Weekly } from './components/weekly/weekly';
@Component({
  imports: [ProcessTable, ProcessForm, ProcessStepForm, ProcessStepTable, OrdersForm, Eval, MatTabsModule, MatCard, Average, Weekly],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
