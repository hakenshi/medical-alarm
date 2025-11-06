import { Item } from "@/types/item";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import AlarmForm from "../alarm-form";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: "name",
        header: "Nome do Remédio"
    },
    {
        accessorKey: "dosage",
        header: "Dosagem"
    },
    {
        accessorKey: "isContinous",
        header: "Contínuo",
        cell: ({ row: { original: { isContinous } } }) => isContinous ? "Sim" : "Não"
    },
    {
        accessorKey: "durationDays",
        header: "Duração",
        cell: ({ row: { original: { durationDays } } }) => durationDays !== "" ? durationDays : "Sem duração"
    },
    {
        accessorKey: "frequency",
        header: "Frequência"
    },
    {
        accessorKey: "times",
        header: "Horários",
        cell: ({ row: { original: { times } } }) => String(times)
    },
    {
        accessorKey: "actions",
        header: "",
        cell: ({ row: { original: alarm } }) => {

            const deleteAlarm = async () => {
                await window.ipcRenderer.invoke("alarm:delete", alarm.id)
            }

            return (
                <div className="flex justify-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PencilIcon /> Editar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <AlarmForm defaultValues={alarm} />
                        </DialogContent>
                    </Dialog>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>
                                <TrashIcon /> Exlcuir
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                Excluir alarme para "{alarm.name}"
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Tem certeza de que deseja excluir o alarme do remédio: "{alarm.name}"?
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <Button onClick={async () => await deleteAlarm()}>
                                    Sim
                                </Button>
                                <AlertDialogCancel>
                                    Não
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        }
    }
]