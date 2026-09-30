import { inject, Injectable, signal} from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { ProcessData } from '../models/process-data';

@Injectable({
    providedIn: 'root'
})
export class Process {

    //private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://127.0.0.1:8000/api/processes";

    private readonly processResource = httpResource<ProcessData[]>(
        () => this.apiUrl
    );

    //private readonly processListSignal = signal<ProcessData[]>([]); // #TODO make httpResource for more information (status info)
    readonly processData = this.processResource

    updateRandomData(): void {    
        this.processResource.reload()
        /*this.processListSignal.update(processes =>  // "Funktionsaufruf"
             processes.map(process => ({
                ...process,

                amount: +(process.amount + (Math.random() * 4 - 2)).toFixed(1)
             }))
            );
        */
    }
}