import { Injectable, signal} from '@angular/core';
import { ProcessData } from '../models/process-data';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly processListSignal = signal<ProcessData[]>([ // Mock data, 
    {id: 1, name: 'Temperatur', amount: 42.5, timestamp: '2012', status: 'GOOD'},
    {id: 2, name: 'Wrinkler', amount: 12, timestamp: '2018', status: "BAD"}
  ]);

  readonly processList = this.processListSignal.asReadonly();

  updateRandomData(): void {
        this.processListSignal.update(processes =>
             processes.map(process => ({
                ...process,

                amount: +(process.amount + (Math.random() * 4 - 2)).toFixed(1)
             }))
            );
    }
}