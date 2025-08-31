import Loader from "../../../components/common/Loader"
import useStudentEnquiries from "../../../hooks/useStudentEnquiry"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import StudentEnquiryList from "../../components/StudentEnquiry/StudentEnquiryList"

const StudentEnquiry = () => {
    const { loading } = useStudentEnquiries()
    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Student Enquiry" />
            <div className="flex flex-col gap-10 ">
                <StudentEnquiryList />
            </div>
        </>

    )
}

export default StudentEnquiry