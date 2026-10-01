import {z} from "zod";

export const ProcessSchema = z.object({
    id: z.number(),
    name: z.string(),
    duration: z.number()
});

export const ProcessListZod = z.array(ProcessSchema)

export const ProcessCreateSchema = ProcessSchema.omit({id: true});
export type ProcessCreate = z.infer<typeof ProcessCreateSchema>;