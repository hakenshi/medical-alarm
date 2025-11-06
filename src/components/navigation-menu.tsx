import { AlarmClockIcon, HomeIcon, PlusIcon, SettingsIcon } from "lucide-react"
import { NavLink } from "react-router"
import AlarmForm from "./alarm-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const routes = [
  {
    icon: HomeIcon,
    route: "/",
    text: "Home"
  },
  {
    icon: AlarmClockIcon,
    route: "/alarms",
    text: "Alarmes"
  },
  {
    icon: SettingsIcon,
    route: "/configurations",
    text: "Configurações"
  }
]

export default function NavigationMenu() {
  return (
    <footer className="glass-effect border-t border-border/50 backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 p-4 max-w-md mx-auto">
        {/* Add Button - Central and prominent */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[70px] hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer">
              <PlusIcon className="w-6 h-6" />
              <p className="text-xs">Novo</p>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-card rounded-xl shadow-lg border-0">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Adicionar Medicamento</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Configure um novo lembrete para seu medicamento
              </DialogDescription>
            </DialogHeader>
            <AlarmForm />
          </DialogContent>
        </Dialog>

        {/* Navigation Items */}
        <div className="flex gap-1">
          {routes.map((route, i) => (
            <NavLink
              key={i}
              to={route.route}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-[70px] ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              <route.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{route.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  )
}
