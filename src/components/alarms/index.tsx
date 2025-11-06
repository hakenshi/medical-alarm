import { AlarmSchedule } from '@/lib/zod/alarm-schedule'
import { useEffect, useState } from 'react'

export default function Alarms() {

    const [alarms, setAlarms] = useState<AlarmSchedule[]>([])

    useEffect(() => {
        const fetchAlarms = async () => {
            const alarms = await window.ipcRenderer.invoke("alarm:getAll")
            setAlarms(alarms)
        }
        fetchAlarms()
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <h1 className='font-semibold text-3xl'>Meus Alarmes</h1>
            {alarms.map(a => (
                <p>
                    {a.name}
                </p>
            ))}
        </div>
    )
}
