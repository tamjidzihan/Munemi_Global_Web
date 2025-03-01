import { Outlet } from "react-router-dom"
import { TopHeader } from "../components/TopHeader"
import { Navbar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop"
import ScrollToTopButton from "../components/common/ScrollToTop/ScrollToTopButton"

const Layout = () => {

    return (
        <div className="w-full min-h-screen bg-white">
            <ScrollToTop />
            <TopHeader />
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollToTopButton />
        </div>
    )
}

export default Layout