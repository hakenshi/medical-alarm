import { Item } from '@/types/item'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { PillIcon, PlusIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import AlarmForm from '../alarm-form'
import { Button } from '../ui/button'

export default function Alarms() {
    const [alarms, setAlarms] = useState<Item[]>([])

    useEffect(() => {
        const fetchAlarms = async () => {
            const alarms = await window.ipcRenderer.invoke("alarm:getAll")
            setAlarms(alarms)
        }
        fetchAlarms()
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 medical-gradient rounded-xl">
                        <PillIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>Meus Medicamentos</h1>
                        <p className="text-muted-foreground">
                            {alarms.length} {alarms.length === 1 ? 'medicamento configurado' : 'medicamentos configurados'}
                        </p>
                    </div>
                </div>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="medical-gradient text-white border-0 hover:opacity-90">
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Adicionar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card rounded-xl shadow-lg border-0">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">Adicionar Medicamento</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Configure um novo lembrete para seu medicamento
                            </DialogDescription>
                        </DialogHeader>
                        <AlarmForm />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Alarms Table */}
            <div className="medical-card p-6">
                {alarms.length > 0 ? (
                    <DataTable columns={columns} data={alarms} />
                ) : (
                    <div className="text-center py-12">
                        <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <PillIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Nenhum medicamento configurado</h3>
                        <p className="text-muted-foreground mb-4">
                            Adicione seu primeiro medicamento para começar a receber lembretes
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="medical-gradient text-white border-0">
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Adicionar Primeiro Medicamento
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card rounded-xl shadow-lg border-0">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold">Adicionar Medicamento</DialogTitle>
                                    <DialogDescription className="text-muted-foreground">
                                        Configure um novo lembrete para seu medicamento
                                    </DialogDescription>
                                </DialogHeader>
                                <AlarmForm />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    )
}
