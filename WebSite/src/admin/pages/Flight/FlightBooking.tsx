import Loader from "../../../components/common/Loader"
import useFlightBookings from "../../../hooks/useFlightBookings"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import FlightBookingList from "../../components/Flight/FlightBooking/FlightBookingList"

const FlightBooking = () => {
    const { bookings, deleteBooking, loading } = useFlightBookings()

    if (loading) return <Loader />

    return (
        <>
            <Breadcrumb pageName="Flight Booking" />
            <div className="flex flex-col gap-10 ">
                <FlightBookingList
                    allBookings={bookings}
                    deleteBooking={deleteBooking}
                />
            </div>
        </>
    )
}

export default FlightBooking