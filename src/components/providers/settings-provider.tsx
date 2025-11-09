import { SettingsContext } from "@/hooks/useSettings"
import { PropsWithChildren, useEffect, useState } from "react"
import defaultSettings from "../../assets/settings.json"

export function SettingsProvider({ children }: PropsWithChildren) {
    const [settings, setSettings] = useState<Settings>(defaultSettings[0])

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