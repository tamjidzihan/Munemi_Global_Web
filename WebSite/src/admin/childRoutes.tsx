import PageTitle from "./components/PageTitle";
import Appointments from "./pages/Appointment/Appointments";
import DashboardIndex from "./pages/Dashboard/DashboardIndex";
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
    // {
    //     path: "alumni",
    //     element: (
    //         <>
    //             <PageTitle title="Alumni List | Modarate Alumni List" />
    //             <AlumniList />
    //         </>
    //     ),
    // },
    // {
    //     path: "gallery",
    //     element: (
    //         <>
    //             <PageTitle title="Gallery | Photo Gallery" />
    //             <Gallery />
    //         </>
    //     ),
    // },
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
