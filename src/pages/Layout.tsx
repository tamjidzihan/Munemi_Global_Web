import { Outlet } from "react-router-dom"
import { TopHeader } from "../components/TopHeader"
import { Navbar } from "../components/NavBar"
import { Footer } from "../components/Footer"

const Layout = () => {
    return (
        <div className="w-full min-h-screen bg-white">
            <TopHeader />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout