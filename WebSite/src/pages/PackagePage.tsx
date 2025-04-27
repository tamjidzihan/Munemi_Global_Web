import { Outlet } from 'react-router-dom'
import PageTitle from '../admin/components/PageTitle'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'

const PackagePage = () => {
    return (
        <>
            <PageTitle title=' Popular Packages | Munemi Global' />
            <section className=' bg-red-500'>
                <Breadcrumb />
            </section>
            <Outlet />
        </>
    )
}

export default PackagePage