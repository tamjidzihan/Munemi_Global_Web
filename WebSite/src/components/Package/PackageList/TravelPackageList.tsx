import usePackage from '../../../hooks/usePackage'
import PackageFilters from './PackageFilters'
import { PackageList } from './PackageList'
import PackageSearchBar from './PackageSearchBar'

const TravelPackageList = () => {
    const { packages } = usePackage()


    return (
        <div className="min-h-screen bg-gray-50">
            <PackageSearchBar />
            <div className=" max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <PackageFilters />
                    </div>
                    <div className="w-full md:w-3/4">
                        <PackageList packages={packages} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelPackageList