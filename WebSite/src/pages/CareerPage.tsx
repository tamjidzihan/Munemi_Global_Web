import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import PageTitle from '../admin/components/PageTitle'
import { Outlet } from 'react-router-dom'

const CareerPage = () => {
    return (
        <>
            <PageTitle title='Career With Us | Munemi Global' />
            <section className=' bg-red-500'>
                <Breadcrumb />
            </section>
            <Outlet />

        </>
    )
}

export default CareerPage