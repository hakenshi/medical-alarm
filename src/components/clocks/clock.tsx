import { useEffect, useState } from 'react'
import AnalogClock from './analog-clock'

export default function Clock() {

    const [time, setTime] = useState(new Date().toLocaleTimeString("pt-BR", {
        timeStyle: "short"
    }))

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString("pt-BR", {
                timeStyle: "short"
            }))
        }, 1000)

        return () => clearInterval(interval)
    })

    return (
        <div className='text-center'>
            <p className='font-bold text-4xl'>Hora Atual:</p>
            <p className='font-semibold text-4xl'>{time}</p>
            <AnalogClock />
        </div>
    )
}
