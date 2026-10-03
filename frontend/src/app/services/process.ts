import { inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { ProcessListZod, ProcessCreate, ProcessCreateSchema } from '../models/process-schema';

@Injectable({
    providedIn: 'root'
})
export class Process {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://127.0.0.1:8000/api/processes";

    private readonly processResource = httpResource(
        () => this.apiUrl,
        { parse: (data) => ProcessListZod.parse(data), }
    );

    readonly processData = this.processResource

    createProcess(newProcess: ProcessCreate) {
        const validData = ProcessCreateSchema.parse(newProcess)
        
        this.http.post(this.apiUrl, validData).subscribe({
            next: () => {
                this.processResource.reload()
            }
        })
    }
}