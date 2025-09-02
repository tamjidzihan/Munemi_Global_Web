import { Outlet } from "react-router-dom"
import { TopHeader } from "../components/TopHeader"
import { Navbar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import ScrollToTop from "../components/common/ScrollToTop/ScrollToTop"
import ScrollToTopButton from "../components/common/ScrollToTop/ScrollToTopButton"
import WhatsAppButton from "../components/common/WhatsAppButton/WhatsAppButton"
import StudentQueryButton from "../components/common/StudentQueryButton/StudentQueryButton"

const Layout = () => {

    return (
        <div className="w-full min-h-screen bg-white">
            <ScrollToTop />
            <StudentQueryButton />
            <TopHeader />
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollToTopButton />
            <WhatsAppButton />
        </div>
    )
}

export default Layout