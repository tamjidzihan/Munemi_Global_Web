import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import Enrollment from "./components/Services/AcademicServices/Enrollment";
import FreeCareerCounseling from "./components/Services/AcademicServices/FreeCareerCounseling";
import GeneralHealthInsurance from "./components/Services/AcademicServices/GeneralHealthInsurance";
import IELTS_PTE from "./components/Services/AcademicServices/IeltsPte";
import OSHC from "./components/Services/AcademicServices/OSHC";
import Scholarship from "./components/Services/AcademicServices/Scholarship";
import NAATIPTE from "./components/Services/PostAcademicServices/NaatiPete";
import ProfessionalYear from "./components/Services/PostAcademicServices/ProfessionalYear";
import Accommodation from "./components/Services/SupportServices/Accommodation";
import AirportPickup from "./components/Services/SupportServices/AirportPickup";
import BankingSupport from "./components/Services/SupportServices/BankingSupport";
import TaxReturn from "./components/Services/SupportServices/TaxReturn";
import PreDeparture from "./components/Services/PreDepartureServices/PreDeparture";
import AirTicketing from "./components/Services/PreDepartureServices/AirTicketing";
import StudentVisa from "./components/Services/VisaServices/StudentVisa";
import PartnerVisa from "./components/Services/VisaServices/PartnerVisa";
import VisitorVisa from "./components/Services/VisaServices/VisitorVisa";
import MigrationServices from "./components/Services/VisaServices/MigrationServices";



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
                    { path: 'pre-departure', element: <PreDeparture /> },
                    { path: 'air-ticketing', element: <AirTicketing /> },
                    { path: 'student-visa', element: <StudentVisa /> },
                    { path: 'partner-visa', element: <PartnerVisa /> },
                    { path: 'visitor-visa', element: <VisitorVisa /> },
                    { path: 'migration-services', element: <MigrationServices /> },
                ]
            },
        ]
    }
])