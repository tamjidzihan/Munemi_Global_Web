import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { Outlet } from 'react-router-dom'

const StudyDestinationPage = () => {
    return (
        <>
            <div className=" bg-red-500 ">
                <Breadcrumb />
            </div>
            <Outlet />
        </>
    )
}

export default StudyDestinationPage