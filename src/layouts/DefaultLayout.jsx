import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export const DefaultLayout = () => {
    return (
        <div className="antialiased selection:bg-amber-500 selection:text-black min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}