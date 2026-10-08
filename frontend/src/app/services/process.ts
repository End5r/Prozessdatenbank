import { inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import {AverageStepList, ProcessCreate, ProcessList, ProcessStepCreate, ProcessStepList, ProcessStepType, ProcessType, WeeklySummaryList} from '../models/process-schema';
import { Orders } from './orders';
import { Summary } from './summary';
import { API_BASE_URL } from '../api.config';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly http = inject(HttpClient);
    private readonly orders = inject(Orders)
    private readonly summary = inject(Summary)
    private readonly apiUrlStep = `${API_BASE_URL}/process/step`;
    private readonly apiUrl = `${API_BASE_URL}/process`;
    private readonly averageStepUrl = `${API_BASE_URL}/step-average`;

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

    readonly processStepData = this.processStepResource;
    readonly processData = this.processResource;
    readonly averageStepData = this.averageStepRessource;

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
                this.summary.weeklySummaryData.reload()
            }
        })
    }    
}