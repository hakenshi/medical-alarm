interface Settings {
  id?: number,
  alarmSound: boolean
  customAudio?: string
  minimizeToTray: boolean
  startWithComputer: boolean
  autoDeleteExpired: boolean
  darkTheme: boolean
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (key: keyof Settings, value: string | boolean) => void
}