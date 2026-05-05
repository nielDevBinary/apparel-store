import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { CartDrawer } from "../components/CartDrawer"

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">
            <Outlet />
        </main>
    </div>
  )
}
