import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrdersCreate, OrdersType } from '../models/orders-schema';

@Injectable({
    providedIn: 'root'
})

export class Orders {
    private readonly http = inject(HttpClient)
    private readonly orderUrl = "http://127.0.0.1:8000/orders"

    createOrders(newOrders: OrdersType){
        const validData = OrdersCreate.parse(newOrders)

        this.http.post(this.orderUrl, validData).subscribe({})
    }
}
