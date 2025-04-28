import { PackageProps } from "../../../hooks/usePackage"
import { PackageListCard } from "./PackageListCard"


interface PackageListProps {
    packages: PackageProps[]
}

export function PackageList({ packages }: PackageListProps) {
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
