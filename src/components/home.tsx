import { Item } from '@/types/item'
import { BellIcon, ClockIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Clock from './clocks/clock'

export default function Home() {

    const [alarms, setAlarms] = useState<Item[]>([])

    useEffect(() => {
        async function fetchAlarms() {
            const alarms = await window.ipcRenderer.invoke("alarm:getAll")
            setAlarms(alarms)
        }
        fetchAlarms()
    }, [])

    return (
        <div className="w-full h-full max-w-4xl mx-auto grid gap-8">
            {/* Main Clock Card */}
            <div className="medical-card p-8">
                <Clock />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="medical-card flex justify-center flex-col p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ClockIcon className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg">Próximo Alarme</h3>
                    <p className="text-muted-foreground">--:--</p>
                </div>
                <div className="medical-card flex justify-center flex-col p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <BellIcon className="w-6 h-6 text-accent" />
                        </div>
                    </div>
                    <h3 className="font-semibold text-lg">Alarmes Ativos</h3>
                    <p className="text-muted-foreground">{alarms.length}</p>
                </div>
            </div>
        </div>
    )
}
