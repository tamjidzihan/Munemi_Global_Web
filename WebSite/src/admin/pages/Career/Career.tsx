import Loader from "../../../components/common/Loader"
import useCareer from "../../../hooks/useCareer"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import CareerList from "../../components/Career/CareerList"

const Career = () => {
    const { careers, deleteCareer, loading } = useCareer()
    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Career" />
            <div className="flex flex-col gap-10 ">
                <CareerList
                    allCareer={careers}
                    deleteCareer={deleteCareer}
                />
            </div>
        </>
    )
}

export default Career