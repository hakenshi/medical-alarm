import { createContext, useContext } from "react"

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

function useSettings() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error("useSettings deve ser utilizando de SettingsProvider.")
    }
    return context
}

export { SettingsContext, useSettings }