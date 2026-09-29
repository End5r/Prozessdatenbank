import { Injectable, signal} from '@angular/core';
import { ProcessData } from '../models/process-data';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly processListSignal = signal<ProcessData[]>([]);

  readonly processList = this.processListSignal.asReadonly();

  updateRandomData(): void {    
        this.processListSignal.update(processes =>  // "Funktionsaufruf"
             processes.map(process => ({
                ...process,

                amount: +(process.amount + (Math.random() * 4 - 2)).toFixed(1)
             }))
            );
    }
}