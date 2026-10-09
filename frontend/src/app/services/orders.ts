import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Evaluation, OrdersCreate, OrdersType } from '../models/orders-schema';
import { Process } from './process';
import { Summary } from './summary';
import { API_BASE_URL } from '../api.config';

@Injectable({
    providedIn: 'root'
})

export class Orders {
    private readonly http = inject(HttpClient)
    private readonly summary = inject(Summary)
    private readonly orderUrl = `${API_BASE_URL}/orders`
    private readonly evalUrl = `${API_BASE_URL}/evaluation`

    createOrders(newOrders: OrdersType){
        const validData = OrdersCreate.parse(newOrders)

        this.http.post(this.orderUrl, validData).subscribe({
            next: () => {
                this.evalRessource.reload()
                this.summary.weeklySummaryData.reload()
            }
        })
    }

    private readonly evalRessource = httpResource(
        () => this.evalUrl, 
        { parse: (data) => Evaluation.parse(data)}
    )

    readonly evalData = this.evalRessource
}
