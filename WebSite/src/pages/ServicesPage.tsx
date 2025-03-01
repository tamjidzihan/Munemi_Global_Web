import { Outlet } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb/Breadcrumb"

const ServicesPage = () => {
    return (
        <>
            <div className=" bg-red-500 ">
                <Breadcrumb />
            </div>
            <Outlet />
        </>
    )
}

export default ServicesPage