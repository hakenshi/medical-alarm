import { zodResolver } from "@hookform/resolvers/zod"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import Clock from "./components/clock"
import { Button } from "./components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./components/ui/form"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { alarmScheduleSchema, alarmScheduleType } from "./lib/zod/alarm-schedule"
import { generateMedicationTimes } from "./lib/utils"

function App() {

  const form = useForm<alarmScheduleType>({
    resolver: zodResolver(alarmScheduleSchema),
    defaultValues: {
      name: "",
      dosage: "",
      durationDays: 0,
      frequency: 0,
      isContinous: true,
      times: [],
      startingTime: ""
    }
  })

  const submit = (values: alarmScheduleType) => {
    const times = generateMedicationTimes(values.frequency, new Date(values.startingTime))
    console.log(times)
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Clock />
      <div className="space-x-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Remédio</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Remédio</DialogTitle>
            </DialogHeader>
            <DialogDescription>
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
                            <Input placeholder="Ex: 5 dias" {...field} />
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
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ver Remédios</Button>
          </DialogTrigger>
          <DialogContent>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default App
