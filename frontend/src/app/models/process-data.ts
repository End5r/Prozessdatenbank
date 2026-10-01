import {z} from "zod";

export const ProcessDataZod = z.object({
    id: z.number(),
    name: z.string(),
    duration: z.number()
});

export const ProcessListZod = z.array(ProcessDataZod)