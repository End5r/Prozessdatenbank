import { inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessData } from '../models/process-data';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://127.0.0.1:8000/api/processes";

    private readonly processListSignal = signal<ProcessData[]>([]); // empty signal
    readonly processList = this.processListSignal.asReadonly();

    constructor() {
        this.loadProcesses();
    }

    loadProcesses(): void {
        this.http.get<ProcessData[]>(this.apiUrl).subscribe({
            next: (data) => this.processListSignal.set(data),
            error: (err) => console.error("couldnt load process", err)
        })
    }

    updateRandomData(): void {    
        this.processListSignal.update(processes =>  // "Funktionsaufruf"
             processes.map(process => ({
                ...process,

                amount: +(process.amount + (Math.random() * 4 - 2)).toFixed(1)
             }))
            );
    }
}