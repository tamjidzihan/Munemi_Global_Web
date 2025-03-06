import { createBrowserRouter } from "react-router-dom";
import Enrollment from "./components/Services/AcademicServices/Enrollment";
import FreeCareerCounseling from "./components/Services/AcademicServices/FreeCareerCounseling";
import GeneralHealthInsurance from "./components/Services/AcademicServices/GeneralHealthInsurance";
import IELTS_PTE from "./components/Services/AcademicServices/IeltsPte";
import OSHC from "./components/Services/AcademicServices/OSHC";
import Scholarship from "./components/Services/AcademicServices/Scholarship";
import NAATIPTE from "./components/Services/PostAcademicServices/NaatiPete";
import ProfessionalYear from "./components/Services/PostAcademicServices/ProfessionalYear";
import AirTicketing from "./components/Services/PreDepartureServices/AirTicketing";
import PreDeparture from "./components/Services/PreDepartureServices/PreDeparture";
import Services from "./components/Services/Services";
import Accommodation from "./components/Services/SupportServices/Accommodation";
import AirportPickup from "./components/Services/SupportServices/AirportPickup";
import BankingSupport from "./components/Services/SupportServices/BankingSupport";
import TaxReturn from "./components/Services/SupportServices/TaxReturn";
import FamilyParentVisa from "./components/Services/VisaServices/FamilyParentVisa";
import MigrationServices from "./components/Services/VisaServices/MigrationServices";
import OtherTypeVisa from "./components/Services/VisaServices/OtherTypeVisa";
import PartnerVisa from "./components/Services/VisaServices/PartnerVisa";
import PermanentResidency from "./components/Services/VisaServices/PermanentResidency";
import SkilledMigrantVisa from "./components/Services/VisaServices/SkilledMigrantVisa";
import StudentVisa from "./components/Services/VisaServices/StudentVisa";
import VisitorVisa from "./components/Services/VisaServices/VisitorVisa";
import Australia from "./components/StudyDestination/Destinations/Australia";
import Canada from "./components/StudyDestination/Destinations/Canada";
import UnitedKingdom from "./components/StudyDestination/Destinations/UnitedKingdom";
import UnitedStates from "./components/StudyDestination/Destinations/UnitedStates";
import GlobalCareerPathway from "./components/StudyDestination/StudyAbroad/GlobalCareerPathway";
import NetworkingAndSocialization from "./components/StudyDestination/StudyAbroad/NetworkingAndSocialization";
import StudyAbroadFAQ from "./components/StudyDestination/StudyAbroad/StudyAbroadFAQ";
import StudyGuides from "./components/StudyDestination/StudyAbroad/StudyGuides";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ServicesPage from "./pages/ServicesPage";
import StudyDestination from "./pages/StudyDestinationPage";
import ErrorPage from "./pages/ErrorPage";
import Hungary from "./components/StudyDestination/Destinations/Hungary";
import France from "./components/StudyDestination/Destinations/France";
import SaudiArabia from "./components/StudyDestination/Destinations/SaudiArabia";
import Spain from "./components/StudyDestination/Destinations/Spain";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/about', element: <AboutPage /> },
            {
                path: 'services',
                element: <ServicesPage />,
                children: [
                    { index: true, element: <Services /> },
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
                    { path: 'other-type-visa', element: <OtherTypeVisa /> },
                    { path: 'skilled-migrant-visa', element: <SkilledMigrantVisa /> },
                    { path: 'family-parent-visa', element: <FamilyParentVisa /> },
                    { path: 'permanent-residency', element: <PermanentResidency /> }
                ]
            },
            {
                path: 'study-destination',
                element: <StudyDestination />,
                children: [
                    { path: 'australia', element: <Australia /> },
                    { path: 'unitedstates', element: <UnitedStates /> },
                    { path: 'canada', element: <Canada /> },
                    { path: 'unitedkingdom', element: <UnitedKingdom /> },
                    { path: 'hungary', element: <Hungary /> },
                    { path: 'france', element: <France /> },
                    { path: 'saudiarabia', element: <SaudiArabia /> },
                    { path: 'spain', element: <Spain /> },
                    { path: 'studyguides', element: <StudyGuides /> },
                    { path: 'global-career-pathway', element: <GlobalCareerPathway /> },
                    { path: 'study-abroad-faq', element: <StudyAbroadFAQ /> },
                    { path: 'networking-&-socialization', element: <NetworkingAndSocialization /> },
                ]
            }
        ]
    }
])