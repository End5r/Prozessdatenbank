import { inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import {AverageStepList, ProcessCreate, ProcessList, ProcessStepCreate, ProcessStepList, ProcessStepType, ProcessType} from '../models/process-schema';
import { Orders } from './orders';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly http = inject(HttpClient);
    private readonly orders = inject(Orders)
    private readonly apiUrlStep = "http://127.0.0.1:8000/process/step";
    private readonly apiUrl = "http://127.0.0.1:8000/process";
    private readonly averageStepUrl = "http://127.0.0.1:8000/step-average";

    private readonly processStepResource = httpResource(
        () => this.apiUrlStep,
        { parse: (data) => ProcessStepList.parse(data)}
    )

    private readonly processResource = httpResource(
        () => this.apiUrl,
        { parse: (data) => ProcessList.parse(data)}
    );

    private readonly averageStepRessource = httpResource(
        () => this.averageStepUrl,
        { parse: (data) => AverageStepList.parse(data)}
    )

    readonly processStepData = this.processStepResource
    readonly processData = this.processResource
    readonly averageStepData = this.averageStepRessource

    createProcessStep(newProcessStep: ProcessStepType){
        const validData = ProcessStepCreate.parse(newProcessStep)

        this.http.post(this.apiUrlStep, validData).subscribe({
            next: () => {
                this.processStepResource.reload(),
                this.averageStepRessource.reload()
            }
        })
    }

    createProcess(newProcess: ProcessType){
        const validData = ProcessCreate.parse(newProcess)

        this.http.post(this.apiUrl, validData).subscribe({
            next: () => {
                this.processResource.reload(),
                this.averageStepRessource.reload(),
                this.orders.evalData.reload()
            }
        })
    }    
}