import usePackage from '../../../hooks/usePackage'
import Hero from '../../common/Hero/Hero'
import PackageFilters from './PackageFilters'
import { PackageList } from './PackageList'
import PackageSearchBar from './PackageSearchBar'
import packageImgs from '../../../assets/packages.jpg'

const TravelPackageList = () => {
    const { packages, loading } = usePackage()


    return (
        <div className="min-h-screen bg-gray-50">
            <Hero bgImage={packageImgs} heroName='All Packages' />
            <PackageSearchBar />
            <div className=" max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <PackageFilters />
                    </div>
                    <div className="w-full md:w-3/4">
                        <PackageList
                            packages={packages}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelPackageList