import { Outlet } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb/Breadcrumb"


const AboutPage = () => {
    return (
        <>
            <section className=" bg-red-500 ">
                <Breadcrumb />
            </section>
            <Outlet />
        </>
    )
}

export default AboutPage