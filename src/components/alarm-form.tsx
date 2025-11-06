import { AlarmSchedule, alarmScheduleSchema } from "@/lib/zod/alarm-schedule"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "./ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { PillIcon, ClockIcon, CalendarIcon, HashIcon } from "lucide-react"

interface Props {
    defaultValues?: AlarmSchedule
}

const values = {
    name: "",
    dosage: "",
    durationDays: "",
    frequency: "",
    isContinous: true,
    times: [],
    startingTime: ""
}

export default function AlarmForm({ defaultValues = values }: Props) {
    const form = useForm<AlarmSchedule>({
        resolver: zodResolver(alarmScheduleSchema),
        defaultValues
    })

    const submit = async (values: AlarmSchedule) => {
        const newAlarm = await window.ipcRenderer.invoke("alarm:create", values)
        console.log(newAlarm)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                {/* Medication Info Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <PillIcon className="w-4 h-4" />
                        Informações do Medicamento
                    </div>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Nome do medicamento</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: Dipirona, Paracetamol..."
                                        className="h-11"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dosage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Dosagem</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: 500mg, 20ml, 1 comprimido..."
                                        className="h-11"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Schedule Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        Configuração de Horários
                    </div>

                    <FormField
                        control={form.control}
                        name="isContinous"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Tipo de tratamento</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value ? "sim" : "nao"}
                                        onValueChange={v => field.onChange(v === "sim")}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                            <RadioGroupItem value="sim" id="continous-yes" />
                                            <Label htmlFor="continous-yes" className="flex-1 flex flex-col items-start cursor-pointer">
                                                <div className="font-medium">Contínuo</div>
                                                <div className="text-xs text-muted-foreground">Uso diário permanente</div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                            <RadioGroupItem value="nao" id="continous-no" />
                                            <Label htmlFor="continous-no" className="lex-1 flex flex-col items-start cursor-pointer">
                                                <div className="font-medium">Temporário</div>
                                                <div className="text-xs text-muted-foreground">Por período limitado</div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!form.watch("isContinous") && (
                        <FormField
                            control={form.control}
                            name="durationDays"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Duração do tratamento</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-3">
                                            <Input
                                                placeholder="Ex: 7"
                                                type="number"
                                                min="1"
                                                className="h-11"
                                                {...field}
                                            />
                                            <Select defaultValue="day">
                                                <SelectTrigger className="h-11 w-32">
                                                    <SelectValue placeholder="Período" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="day">Dias</SelectItem>
                                                    <SelectItem value="month">Meses</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                        <HashIcon className="w-4 h-4" />
                                        Vezes por dia
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: 3"
                                            min={1}
                                            max={24}
                                            type="number"
                                            className="h-11"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startingTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                        <ClockIcon className="w-4 h-4" />
                                        Primeiro horário
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="08:00"
                                            maxLength={5}
                                            className="h-11"
                                            {...field}
                                            onChange={(e) => {
                                                let { value } = e.target
                                                value = value.replace(/\D/g, "")
                                                if (value.length >= 2) {
                                                    value = value.slice(0, 2) + ":" + value.slice(2, 4)
                                                }
                                                field.onChange(value)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormDescription className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        💡 O sistema calculará automaticamente os outros horários baseado na frequência.
                        Por exemplo: se você tomar 3x ao dia começando às 08:00, os próximos serão às 16:00 e 00:00.
                    </FormDescription>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t">
                    <Button
                        type="submit"
                        className="medical-gradient text-white border-0 hover:opacity-90 h-11 px-8"
                    >
                        Salvar Medicamento
                    </Button>
                </div>
            </form>
        </Form>
    )
}