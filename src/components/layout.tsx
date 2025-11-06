import { Outlet } from "react-router";
import NavigationMenu from "./navigation-menu";

export default function Layout() {
    return (
        <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
            <Outlet />
            <NavigationMenu />
        </div>
    )
}
