import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evaluation, OrdersCreate, OrdersType } from '../models/orders-schema';

@Injectable({
    providedIn: 'root'
})

export class Orders {
    private readonly http = inject(HttpClient)
    private readonly orderUrl = "http://127.0.0.1:8000/orders"
    private readonly evalUrl = "http://127.0.0.1:8000/evaluation"

    createOrders(newOrders: OrdersType){
        const validData = OrdersCreate.parse(newOrders)

        this.http.post(this.orderUrl, validData).subscribe({
            next: () => this.evalRessource.reload()
        })
    }

    private readonly evalRessource = httpResource(
        () => this.evalUrl, 
        { parse: (data) => Evaluation.parse(data)}
    )

    readonly evalData = this.evalRessource
}
