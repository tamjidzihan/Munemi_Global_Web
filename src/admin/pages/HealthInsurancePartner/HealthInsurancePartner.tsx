import Loader from "../../../components/common/Loader"
import useHealthInsurancePartners from "../../../hooks/useHealthInsurancePartners"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import HealthInsurancePartnerList from "../../components/HealthInsurancePartner/HealthInsurancePartnerList"

const HealthInsurancePartner = () => {
    const { healthInsurancePartners, deleteHealthInsurancePartner, loading } = useHealthInsurancePartners()

    if (loading) return <Loader />

    return (
        <>
            <Breadcrumb pageName="Health Insurance Partner" />
            <div className="flex flex-col gap-10 ">
                <HealthInsurancePartnerList
                    allPartners={healthInsurancePartners}
                    deletePartner={deleteHealthInsurancePartner}
                />
            </div>
        </>
    )
}

export default HealthInsurancePartner