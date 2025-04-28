import { useParams } from "react-router-dom"
import { PackageDetails } from "./PackageDetails"
import { PackageGallery } from "./PackageGallery"
import { PackageSidebar } from "./PackageSidebar"
import Loader from "../common/Loader"
import usePackageDetail from "../../hooks/useTravelPackageDetail"

export const TravelPackage = () => {
    const { id } = useParams()
    const { travelPackageDetail, loading } = usePackageDetail(id as string)

    if (loading) {
        return <Loader />
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <PackageGallery images={travelPackageDetail?.images || []} />
            <div className="flex flex-col md:flex-row mt-6 gap-6">
                <div className="w-full md:w-2/3">
                    <div className=" text-midnight text-4xl my-5">{travelPackageDetail?.title}</div>
                    <PackageDetails
                        details={travelPackageDetail?.description}
                        termsAndConditions={travelPackageDetail?.termsAndConditions}
                    />
                </div>
                <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <PackageSidebar
                        price={travelPackageDetail?.price}
                        duration={travelPackageDetail?.duration}
                        numberOftraveller={travelPackageDetail?.numberOftraveller}
                        destination={travelPackageDetail?.destination}
                    />
                </div>
            </div>
        </div>
    )
}
