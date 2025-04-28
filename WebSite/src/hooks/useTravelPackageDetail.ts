import { useEffect, useState } from "react"
import { PackageProps } from "./usePackage"
import apiClient from "../services/apiClient"

const useTravelPackageDetail = (selectedPackageId: string) => {
    const [travelPackageDetail, setTravelPackageDetail] = useState<PackageProps>()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        apiClient
            .get<PackageProps>(
                `/package/${selectedPackageId}`
            )
            .then(res => {
                setTravelPackageDetail(res.data)
                setLoading(false);
            })
    }, [selectedPackageId])
    return { travelPackageDetail, loading }
}

export default useTravelPackageDetail;