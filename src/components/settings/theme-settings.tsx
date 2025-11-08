import { PaletteIcon } from 'lucide-react'
import { memo } from 'react'
import { Switch } from '../ui/switch'

interface Props {
    darkTheme: boolean
    updateSettings: (key: keyof Settings, value: boolean | string) => void
}

function ThemeSettings({ darkTheme, updateSettings }: Props) {
    return (
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
                    <Switch
                        checked={darkTheme}
                        onCheckedChange={() => updateSettings("darkTheme", !darkTheme)}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(ThemeSettings, (prev, next) => prev.darkTheme === next.darkTheme)