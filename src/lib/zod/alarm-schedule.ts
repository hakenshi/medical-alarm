import z, { array, boolean, string } from "zod";

export const alarmScheduleSchema = z.object({
    name: string("O nome do remédio não pode ser vazio."),
    dosage: string("A dosagem não pode ser vazia"),
    times: array(string(), { message: "Por favor acrescente ao menos um horário" }),
    frequency: string("A frequência deve ser maior que 0"),
    durationDays: string("A duração deve ser maior que 0"),
    startingTime: string(),
    isContinous: boolean()
})

export type AlarmSchedule = z.infer<typeof alarmScheduleSchema>