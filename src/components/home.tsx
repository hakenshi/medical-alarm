import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AlarmForm from './alarm-form'
import Clock from './clocks/clock'
import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { Link } from 'react-router'

export default function Home() {

    return (
        <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <Clock />
            <div className="space-x-5">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Adicionar Remédio</Button>
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
                <Link to={"/alarms"}>
                    <Button >
                        Meus Alarmes
                    </Button>
                </Link>
            </div>
        </div>
    )
}
