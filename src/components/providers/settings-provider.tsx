import { createContext, PropsWithChildren, useState, useEffect, useContext } from "react"

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const defaultSettings = {
    "id": 1,
    "alarmSound": true,
    "customAudio": "",
    "minimizeToTray": false,
    "startWithComputer": false,
    "autoDeleteExpired": false,
    "darkTheme": false
}

export function SettingsProvider({ children }: PropsWithChildren) {
    const [settings, setSettings] = useState<Settings>(defaultSettings)

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const loadedSettings = await window.ipcRenderer.invoke("settings:get")
                if (loadedSettings) {
                    setSettings(loadedSettings)
                }
            } catch (error) {
                console.error("Erro ao carregar arquivo de configurações: ", error)
            }

        }
        loadSettings()
    }, [])

    const updateSettings = async (key: keyof Settings, value: string | boolean) => {
        try {
            const updated = { ...settings, [key]: value }
            setSettings(updated)
            await window.ipcRenderer.invoke("settings:save", updated)
        } catch (error) {
            console.error("Erro ao atualizar configurações: ", error)
        }
    }

    const contextValue = { settings, updateSettings }

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useSettings deve ser utilizando de SettingsProvider.")
    }
    return context
}