import Loader from "../../../components/common/Loader"
import useInstitutionPartners from "../../../hooks/useInstitutionPartners"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import InstitutionPartnerList from "../../components/InstitutionPartner/InstitutionPartnerList"

const InstitutionPartner = () => {
    const { institutionPartners, deleteInstitutionPartner, loading } = useInstitutionPartners()
    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Institution Partner" />
            <div className="flex flex-col gap-10 ">
                <InstitutionPartnerList
                    allPartners={institutionPartners}
                    deletePartner={deleteInstitutionPartner}
                />
            </div>
        </>
    )
}

export default InstitutionPartner