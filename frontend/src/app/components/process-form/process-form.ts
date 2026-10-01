import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProcessCreateSchema } from '../../models/process-schema';
import { Process } from '../../services/process';


@Component({
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  selector: 'app-process-form',
  styleUrl: './process-form.css',
  templateUrl: './process-form.html',
})
export class ProcessForm {
  private readonly formbuilder = inject(FormBuilder);
  private readonly processService = inject(Process);

  readonly form = this.formbuilder.nonNullable.group({
    name: ["", [Validators.required]],
    duration: [0, [Validators.min(1)]]
  });

  onSubmit() {
    const result = ProcessCreateSchema.safeParse(this.form.getRawValue());
    if (result.success) {
      this.processService.createProcess(result.data);
      this.form.reset();
    } else {
        console.error('error occured', result.error)
    }
  }
}
