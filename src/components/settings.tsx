import { BellIcon, MonitorIcon, PaletteIcon, PlayIcon, SettingsIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function Settings() {

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 shrink-0">
        <div className="p-2 medical-gradient rounded-xl">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Personalize seu aplicativo</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 overflow-y-auto flex-1">
        {/* Alarm Settings */}
        <div className="medical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <BellIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Alarmes</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Som dos alarmes</p>
                <p className="text-sm text-muted-foreground">Reproduzir som quando o alarme tocar</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Aúdio</p>
                <p className="text-sm text-muted-foreground">Customize o aúdio do alarme, envie um áudio personalizado.</p>
              </div>
              <Input className="w-1/3 file:bg-primary file:rounded file:text-white file:px-2 file:cursor-pointer hover:file:bg-sky-500/80 transition-all duration-200" type="file" />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="medical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <MonitorIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Sistema</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Minimizar para bandeja</p>
                <p className="text-sm text-muted-foreground">Manter aplicativo na bandeja do sistema</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Iniciar com o Windows</p>
                <p className="text-sm text-muted-foreground">Abrir automaticamente ao ligar o computador</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="medical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlayIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Automação</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Excluir alarmes automaticamente</p>
                <p className="text-sm text-muted-foreground">Remover alarmes expirados automaticamente</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="medical-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <PaletteIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Aparência</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema escuro</p>
                <p className="text-sm text-muted-foreground">Usar tema escuro na interface</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsProvider({ children }: PropsWithChildren) {


  const [settings, setSettings] = useState<Settings>({
    alarmSound: true,
    customAudio: "",
    minimizeToTray: true,
    startWithComputer: false,
    autoDeleteExpired: true,
    darkTheme: false
  })

  useEffect(() => {
    async function loadSettings() {
      const currentSettings = await window.ipcRenderer.invoke("settings:get")
      if (Object.keys(currentSettings).length === 0) {
        await window.ipcRenderer.invoke("settings:save", settings)
      }
      setSettings(currentSettings)
    }
    loadSettings()
  }, [settings])

  async function updateSettings(key: keyof Settings, value: boolean | string) {
    const updatedSettings = await window.ipcRenderer.invoke("settings:save", { ...settings, [key]: value })
    setSettings(updatedSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(){
  const context = useContext(SettingsContext)
  if(!context) {
    throw new Error("useSettings deve ser utilizando de SettingsProvider.")
  }
  return context
}

