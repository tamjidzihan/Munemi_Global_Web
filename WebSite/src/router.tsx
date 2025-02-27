import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import Enrollment from "./components/Services/Enrollment";
import OSHC from "./components/Services/OSHC";
import GeneralHealthInsurance from "./components/Services/GeneralHealthInsurance";
import Scholarship from "./components/Services/Scholarship";
import IELTS_PTE from "./components/Services/IeltsPte";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'services',
                element: <ServicesPage />,
                children: [
                    { path: 'enrollment', element: <Enrollment /> },
                    { path: 'overseas-student-health-cover', element: <OSHC /> },
                    { path: 'general-health-insurance', element: <GeneralHealthInsurance /> },
                    { path: 'scholarship', element: <Scholarship /> },
                    { path: 'ielts-pte', element: <IELTS_PTE /> },
                ]
            },
        ]
    }
])