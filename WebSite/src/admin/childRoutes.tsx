import PageTitle from "./components/PageTitle";
import Agent from "./pages/Agent/Agent";
import Appointments from "./pages/Appointment/Appointments";
import Career from "./pages/Career/Career";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import HealthInsurancePartner from "./pages/HealthInsurancePartner/HealthInsurancePartner";
import InstitutionPartner from "./pages/InstitutionPartner/InstitutionPartner";
import Package from "./pages/Package/Package";
import StudentEnquiry from "./pages/StudentEnquiry/StudentEnquiry";
import Universities from "./pages/University/Universities";



export const childRoutes = [
    {
        path: "",
        element: (
            <>
                <PageTitle title="Admin Dashboard | Dashboard" />
                <DashboardIndex />
            </>
        ),
        index: true,
    },
    {
        path: "appointments",
        element: (
            <>
                <PageTitle title="Appointments | Manage your Appointments Here" />
                <Appointments />
            </>
        ),
    },
    {
        path: "student-enquiry",
        element: (
            <>
                <PageTitle title="Student Enquiry List | Modarate Student Enquiry List" />
                <StudentEnquiry />
            </>
        ),
    },
    {
        path: "package",
        element: (
            <>
                <PageTitle title="Package | Manage your Package Here" />
                <Package />
            </>
        ),
    },
    {
        path: "career",
        element: (
            <>
                <PageTitle title="Career | Modarate Job Application Here" />
                <Career />
            </>
        ),
    },
    {
        path: "agent",
        element: (
            <>
                <PageTitle title="Agent Application | Modarate Agent  Partners Here" />
                <Agent />
            </>
        ),
    },
    {
        path: "institution-partners",
        element: (
            <>
                <PageTitle title="Institution Partners | Modarate Institution Partners Here" />
                <InstitutionPartner />
            </>
        ),
    },
    {
        path: "health-insurance-partners",
        element: (
            <>
                <PageTitle title="Health Insurance Partners | Modarate Health Insurance Partners Here" />
                <HealthInsurancePartner />
            </>
        ),
    },
    {
        path: "university",
        element: (
            <>
                <PageTitle title="University | Modarate University Here" />
                <Universities />
            </>
        ),
    },
    // {
    //     path: "sitesettings/contact",
    //     element: (
    //         <>
    //             <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
    //             <Contact />
    //         </>
    //     ),
    // },
];
