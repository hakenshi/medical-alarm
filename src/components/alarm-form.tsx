import { AlarmSchedule, alarmScheduleSchema } from "@/lib/zod/alarm-schedule"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "./ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "./ui/label"

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
            <form
                onSubmit={form.handleSubmit(submit)}
                className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do medicamento</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Alprazolam" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dosagem</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 20ml" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <FormField
                    control={form.control}
                    name="isContinous"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>É contínuo?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    value={field.value ? "sim" : "nao"}
                                    onValueChange={v => field.onChange(v === "sim")}
                                    className="flex"
                                >
                                    <div className="flex gap-2 items-center">
                                        <RadioGroupItem value="sim" id="continous-yes" />
                                        <Label htmlFor="continous-yes">Sim</Label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <RadioGroupItem value="nao" id="continous-no" />
                                        <Label htmlFor="continous-no">Não</Label>
                                    </div>
                                </RadioGroup>

                            </FormControl>
                            <FormDescription className="text-xs">
                                Marque como "sim" se o medicamento é tomado de forma diária.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                {!form.watch("isContinous") && (
                    <FormField
                        control={form.control}
                        name="durationDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duração da medicação</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2">
                                        <Input placeholder="Ex: 5 dias" {...field} />
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Duração" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="day" >
                                                    Dias
                                                </SelectItem>
                                                <SelectItem value="month" >
                                                    Meses
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    />
                )
                }
                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Frequência da medicação</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: 3 vezes ao dia"
                                    min={1}
                                    max={24}
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <FormField
                    control={form.control}
                    name="startingTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Horário da Medicação</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="HH:MM"
                                    maxLength={5}
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
                            <FormDescription className="text-xs">
                                O sistema automaticamente calculará os horários da sua medicação com base na frequência da medicação.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                <div className="flex justify-end w-full">
                    <Button>
                        Salvar
                    </Button>
                </div>
            </form>
        </Form>
    )
}