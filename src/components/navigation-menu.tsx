import { AlarmClockIcon, HomeIcon, PlusIcon, SettingsIcon } from "lucide-react"
import { Link, NavLink } from "react-router"
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
    <footer className="p-5 flex gap-5 border-t w-screen items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-sm flex flex-col items-center jusitify-center">
            <PlusIcon />
            <p className="text-xs">Adicionar</p>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Remédio</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <AlarmForm />
          </DialogDescription>
        </DialogContent>
      </Dialog>
      {routes.map((r, i) => (
        <NavLink key={i} className={"text-sm flex flex-col items-center jusitify-center" + "active"} to={r.route}>
          <r.icon />
          <p className="text-xs">
            {r.text}
          </p>
        </NavLink>
      ))}
    </footer>
  )
}
