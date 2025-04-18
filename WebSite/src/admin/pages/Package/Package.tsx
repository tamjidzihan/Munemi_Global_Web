import Loader from "../../../components/common/Loader"
import usePackage from "../../../hooks/usePackage"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import PackageList from "../../components/Package/PackageList"

const Package = () => {
    const { packages, deletePackage, loading } = usePackage()

    if (loading) return <Loader />

    return (
        <>
            <Breadcrumb pageName="Packages" />
            <div className="flex flex-col gap-10 ">
                <PackageList
                    allPackages={packages}
                    deletePackage={deletePackage}
                />
            </div>
        </>
    )
}

export default Package