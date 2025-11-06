import { Outlet } from "react-router";
import NavigationMenu from "./navigation-menu";

export default function Layout() {
    return (
        <div className="w-screen h-screen overflow-hidden bg-linear-to-br from-background via-background to-secondary/20 flex flex-col">
            <main className="p-6 flex-1 overflow-y-auto">
                <Outlet />
            </main>
            <NavigationMenu />
        </div>
    )
}
