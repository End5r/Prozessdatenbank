import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Orders } from '../../../services/orders';
import { OrdersCreate } from '../../../models/orders-schema';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  selector: 'app-orders-form',
  styleUrl: './orders-form.css',
  templateUrl: './orders-form.html',
})
export class OrdersForm {
  private readonly formbuilder = inject(FormBuilder)
  private readonly ordersService = inject(Orders)

  readonly form = this.formbuilder.nonNullable.group({
    ordered_amount: [0, Validators.min(1)]
  })

    onSubmit() {
      const result = OrdersCreate.safeParse(this.form.getRawValue());
      if (result.success) {
        this.ordersService.createOrders(result.data);
        this.form.reset();
      } else {
          console.error('error occured', result.error)
      }
    }
}
