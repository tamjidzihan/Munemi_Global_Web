import Loader from "../../../components/common/Loader"
import useFlightLocations from "../../../hooks/useFlightLocations"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"

import FlightLocationList from "../../components/Flight/FlightLocation/FlightLocationList"

const FlightLocation = () => {
    const { flightLocations, deleteFlightLocation, loading } = useFlightLocations()


    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Air-port Location" />
            <div className="flex flex-col gap-10 ">
                <FlightLocationList
                    allLocations={flightLocations}
                    deleteLocation={deleteFlightLocation}
                />
            </div>
        </>
    )
}

export default FlightLocation