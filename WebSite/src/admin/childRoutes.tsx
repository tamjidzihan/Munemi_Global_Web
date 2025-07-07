import PageTitle from "./components/PageTitle";
import Agent from "./pages/Agent/Agent";
import Appointments from "./pages/Appointment/Appointments";
import Blog from "./pages/Blog/Blog";
import Career from "./pages/Career/Career";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import FlightBooking from "./pages/Flight/FlightBooking";
import FlightLocation from "./pages/Flight/FlightLocation";
import HealthInsurancePartner from "./pages/HealthInsurancePartner/HealthInsurancePartner";
import InstitutionPartner from "./pages/InstitutionPartner/InstitutionPartner";
import Package from "./pages/Package/Package";
import PackageBooking from "./pages/Package/PackageBooking";
import StudentEnquiry from "./pages/StudentEnquiry/StudentEnquiry";
import Universities from "./pages/University/Universities";
import Profile from "./pages/User/Profile";



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
        path: "user-profile",
        element: (
            <>
                <PageTitle title="User Profile | User profile" />
                <Profile />
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
        path: "package/packagelist",
        element: (
            <>
                <PageTitle title="Package | Manage your Package Here" />
                <Package />
            </>
        ),
    },
    {
        path: "package/packagebooking",
        element: (
            <>
                <PageTitle title="Package Booking | Manage your Package Booking Here" />
                <PackageBooking />
            </>
        ),
    },
    {
        path: "career/job",
        element: (
            <>
                <PageTitle title="Career | Modarate Job Application Here" />
                <Career />
            </>
        ),
    },
    {
        path: "career/agent",
        element: (
            <>
                <PageTitle title="Agent Application | Modarate Agent  Partners Here" />
                <Agent />
            </>
        ),
    },
    {
        path: "career/institution-partners",
        element: (
            <>
                <PageTitle title="Institution Partners | Modarate Institution Partners Here" />
                <InstitutionPartner />
            </>
        ),
    },
    {
        path: "career/health-insurance-partners",
        element: (
            <>
                <PageTitle title="Health Insurance Partners | Modarate Health Insurance Partners Here" />
                <HealthInsurancePartner />
            </>
        ),
    },
    {
        path: "flight/flight-booking",
        element: (
            <>
                <PageTitle title="Health Insurance Partners | Modarate Health Insurance Partners Here" />
                <FlightBooking />
            </>
        ),
    },
    {
        path: "flight/flight-location",
        element: (
            <>
                <PageTitle title="Health Insurance Partners | Modarate Health Insurance Partners Here" />
                <FlightLocation />
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
    {
        path: "blog",
        element: (
            <>
                <PageTitle title="Blog | Create Your Blogs" />
                <Blog />
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
