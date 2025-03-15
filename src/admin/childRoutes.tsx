import PageTitle from "./components/PageTitle";
import Appointments from "./pages/Appointment/Appointments";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
import Offers from "./pages/Offers/Offers";
import StudentEnquiry from "./pages/StudentEnquiry/StudentEnquiry";
// import AlumniList from "./pages/AlumniList/AlumniList";
// import DashboardIndex from "./pages/Dashboard/DashboardIndex";
// import Events from "./pages/Events/Events";
// import Gallery from "./pages/Gallery/Gallery";
// import Contact from "./pages/SiteSettings/Contact";
// import SiteContent from "./pages/SiteSettings/Content";


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
        path: "offers",
        element: (
            <>
                <PageTitle title="Offers | Manage your Offers Here" />
                < Offers />
            </>
        ),
    },
    // {
    //     path: "sitesettings/content",
    //     element: (
    //         <>
    //             <PageTitle title="Site Content | Modarate Site content" />
    //             <SiteContent />
    //         </>
    //     ),
    // },
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
