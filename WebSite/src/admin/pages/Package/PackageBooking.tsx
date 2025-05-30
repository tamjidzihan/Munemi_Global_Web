import Loader from "../../../components/common/Loader"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import PackageBookingList from "../../components/PackageBooking/PackageBookingList"
import usePackageBookings from "../../../hooks/usePackageBookings"

const PackageBooking = () => {
    const { loading } = usePackageBookings()

    if (loading) return <Loader />

    return (
        <>
            <Breadcrumb pageName="Package Booking" />
            <div className="flex flex-col gap-10 ">
                <PackageBookingList
                />
            </div>
        </>
    )
}

export default PackageBooking
