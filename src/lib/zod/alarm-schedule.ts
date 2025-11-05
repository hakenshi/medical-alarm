import z, { array, boolean, int, string } from "zod";

export const alarmScheduleSchema = z.object({
    name: string("O nome do remédio não pode ser vazio."),
    dosage: string("A dosagem não pode ser vazia"),
    times: array(string(), { message: "Por favor acrescente ao menos um horário" }),
    frequency: int().positive("A frequência deve ser maior que 0"),
    durationDays: int().positive("A duração deve ser maior que 0"),
    startingTime: string(),
    isContinous: boolean()
})

export type alarmScheduleType = z.infer<typeof alarmScheduleSchema>