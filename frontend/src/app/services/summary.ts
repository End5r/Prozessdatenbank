import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';
import { WeeklySummaryList } from '../models/process-schema';

@Service()
export class Summary {

    private readonly weeklyUrl = "http://127.0.0.1:8000/summary_week";

    private readonly weeeklyRessource = httpResource(
        () => this.weeklyUrl,
        { parse: (data) => WeeklySummaryList.parse(data)}
    )

    readonly weeklySummaryData = this.weeeklyRessource;
}
