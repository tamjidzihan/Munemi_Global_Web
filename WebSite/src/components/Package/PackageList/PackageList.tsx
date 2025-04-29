import { PackageProps } from "../../../hooks/usePackage"
import Loader from "../../common/Loader"
import { PackageListCard } from "./PackageListCard"

interface PackageListProps {
    packages: PackageProps[]
    loading: boolean
}

export function PackageList({ packages, loading }: PackageListProps) {
    if (loading) return <Loader />
    return (
        <div>
            {packages.map((pkg) => (
                <PackageListCard
                    pkg={pkg}
                />
            ))}
        </div>
    )
}
