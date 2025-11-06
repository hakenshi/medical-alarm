import { Item } from '@/types/item'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

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
        <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <h1 className='font-semibold text-3xl'>Meus Alarmes</h1>
            <DataTable columns={columns} data={alarms} />
        </div>
    )
}
