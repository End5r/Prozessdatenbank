import {int, z} from "zod";
//Models for Output
export const ProcessStep = z.object({
    id: z.number(),
    step_order: z.number(),
    is_last: z.boolean(),
})

export const Process = z.object({
    id: z.number(),
    amount: z.number(),
    duration: z.number(),
    step_id: z.number(),
    created_at: z.string(),
    produced_at: z.string()
})

export const AverageStep = z.object({
    step_order: z.number(),
    average: z.number()
})


//Lists for HTML 
export const ProcessList = z.array(Process)
export const ProcessStepList = z.array(ProcessStep)
export const AverageStepList = z.array(AverageStep)


// Models for Input
export const ProcessStepCreate = ProcessStep.omit({id: true})
export const ProcessCreate = Process.omit({id: true, created_at:true})


export type ProcessType = z.infer<typeof ProcessCreate>
export type ProcessStepType = z.infer<typeof ProcessStepCreate>
export type AverageStepType = z.infer<typeof AverageStep>