import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Process } from '../../services/process';
import { ProcessStepCreate } from '../../models/process-schema';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  selector: 'app-process-step-form',
  styleUrl: './process-step-form.css',
  templateUrl: './process-step-form.html',
})
export class ProcessStepForm {
    private readonly formbuilder = inject(FormBuilder);
  private readonly processService = inject(Process);

  readonly form = this.formbuilder.nonNullable.group({
    step_order: [0, [Validators.min(1)]],
    is_last: [false],
  });

  onSubmit() {
    const result = ProcessStepCreate.safeParse(this.form.getRawValue());
    if (result.success) {
      this.processService.createProcessStep(result.data);
      this.form.reset();
    } else {
        console.error('error occured', result.error)
    }
  }
}
