import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateMedicationTimes(
  frequency: number,
  startTime: Date
): string[] {
  if (frequency <= 0 || frequency > 24) return []

  const times: string[] = []
  const hoursInterval = 24 / frequency

  for (let i = 0; i < frequency; i++) {
    const nextTime = new Date(startTime)
    nextTime.setHours(nextTime.getHours() + i * hoursInterval)

    times.push(format(nextTime, "HH:mm"))
  }

  return times
}
