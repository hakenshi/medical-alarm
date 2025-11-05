import { clsx, type ClassValue } from "clsx"
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
  
  for(let i = 0; i < frequency; i++){
    const nextTime = new Date(startTime)
    nextTime.setHours(nextTime.getHours() + i * hoursInterval)
    
    const hour = String(nextTime.getHours())
    const minutes = String(nextTime.getMinutes())
    
    times.push(`${hour}:${minutes}`)
  }

  return times
}