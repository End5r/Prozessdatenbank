import {int, number, z} from "zod";

export const OrdersCreate = z.object({
    ordered_amount: number()
})

export const Evaluation = z.object({
    produced: z.number(),
    ordered: z.number()
})

export type OrdersType = z.infer<typeof OrdersCreate>
export type EvaluationType = z.infer<typeof Evaluation>