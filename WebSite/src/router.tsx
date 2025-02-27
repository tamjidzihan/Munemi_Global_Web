import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import Enrollment from "./components/Services/Enrollment";
import OSHC from "./components/Services/OSHC";
import GeneralHealthInsurance from "./components/Services/GeneralHealthInsurance";
import Scholarship from "./components/Services/Scholarship";
import IELTS_PTE from "./components/Services/IeltsPte";
import FreeCareerCounseling from "./components/Services/FreeCareerCounseling";
import ProfessionalYear from "./components/Services/ProfessionalYear";
import NAATIPTE from "./components/Services/NaatiPete";
import TaxReturn from "./components/Services/TaxReturn";
import AirportPickup from "./components/Services/AirportPickup";
import Accommodation from "./components/Services/Accommodation";
import BankingSupport from "./components/Services/BankingSupport";


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
                    { path: 'free-career-counseling', element: <FreeCareerCounseling /> },
                    { path: 'professional-year', element: <ProfessionalYear /> },
                    { path: 'naati-pte', element: <NAATIPTE /> },
                    { path: 'tax-return', element: <TaxReturn /> },
                    { path: 'airport-pickup', element: <AirportPickup /> },
                    { path: 'accommodation', element: <Accommodation /> },
                    { path: 'banking-support', element: <BankingSupport /> },
                ]
            },
        ]
    }
])