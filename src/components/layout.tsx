import { Outlet } from "react-router";
import NavigationMenu from "./navigation-menu";
import { useSettings } from "./providers/settings-provider";

export default function Layout() {

    const { settings } = useSettings()

    const root = document.getElementById("root")
    if (settings.darkTheme) {
        root?.classList.add("dark")
    } else {
        root?.classList.remove("dark")
    }


    return (
        <div className="w-screen h-screen overflow-hidden bg-background flex flex-col">
            <main className="p-6 flex-1 overflow-y-auto">
                <Outlet />
            </main>
            <NavigationMenu />
        </div>
    )
}
