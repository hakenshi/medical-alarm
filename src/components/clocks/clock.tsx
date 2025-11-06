import { useEffect, useState } from 'react'
import AnalogClock from './analog-clock'

export default function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const timeString = time.toLocaleTimeString("pt-BR", {
        timeStyle: "short"
    })

    const dateString = time.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return (
        <div className='text-center space-y-6'>
            {/* Digital Clock */}
            <div className="space-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                    {timeString}
                </div>
                <p className="text-muted-foreground text-lg capitalize">
                    {dateString}
                </p>
            </div>
            
            {/* Analog Clock */}
            <div className="flex justify-center">
                <AnalogClock />
            </div>
        </div>
    )
}
