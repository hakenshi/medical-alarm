import { Item } from "@/types/item";
import { ColumnDef } from "@tanstack/react-table";

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
    },
    {
        accessorKey: "frequency",
        header: "Frequência"
    },
    {
        accessorKey: "times",
        header: "Horários",
        cell: ({ row: { original: { times } } }) => String(times)
    }
]