import Hero from "../common/Hero/Hero";
import HeroImage from "../../assets/slide-1.jpg";
import { GraduationCap, Briefcase, Globe, Users } from "lucide-react";
import { useState } from "react";
import bgImage1 from "../../assets/slide-2.jpg";
import bgImage2 from "../../assets/slide-3.jpg";
import bgImage3 from "../../assets/statistic.jpg";
import bgImage4 from "../../assets/slide-1.jpg";
import { Link } from "react-router-dom";
import { MenuCard } from "../common/MenuCard/ServiceMenuCard";

const academicServices = [
    { label: "Enrollment", link: "/services/enrollment" },
    { label: "OSHC", link: "/services/overseas-student-health-cover" },
    { label: "OVHC", link: "/services/general-health-insurance" },
    { label: "Scholarship", link: "/services/scholarship" },
    { label: "IELTS/PTE Preparation", link: "/services/ielts-pte" },
    { label: "Free Career Counceling", link: "/services/free-career-counseling" }
];

const postAcademicServices = [
    { label: "Professional Year", link: "/services/professional-year" },
    { label: "NAATI/CCL", link: "/services/naati-pte" }
];

const supportServices = [
    { label: "Tax Return", link: "/services/tax-return" },
    { label: "Airport Pikup", link: "/services/airport-pickup" },
    { label: "Accomodation", link: "/services/accommodation" },
    { label: "Bank Account Oppening", link: "/services/banking-support" },
    { label: "General Health Insurance", link: "/services/general-health-insurance" }
];

const preDepartureServices = [
    { label: "Pre-Departure Briefing", link: "/services/pre-departure" },
    { label: "Air-Ticketing", link: "/services/air-ticketing" }
];

const visaServices = [
    { label: "Student Visa", link: "/services/student-visa" },
    { label: "Partner Visa", link: "/services/partner-visa" },
    { label: "Visitor Visa", link: "/services/visitor-visa" },
    { label: "Migration Services", link: "/services/migration-services" },
    { label: "Other Type Visa", link: "/services/other-type-visa" },
    { label: "Skilled/Work Visa", link: "/services/skilled-migrant-visa" },
    { label: "Family/Parent Visa", link: "/services/family-parent-visa" },
    { label: "Permanent Residency", link: "/services/permanent-residency" },
];

const services = [
    {
        title: "Academic Services",
        description: "Services that help International Student in every steps of their career goal",
        icon: GraduationCap,
        bgImage: bgImage1,
        items: academicServices,
    },
    {
        title: "Essential Services",
        description: "Apart from the academic services we help our clients with additional services.",
        icon: Briefcase,
        bgImage: bgImage2,
        items: [...supportServices, ...preDepartureServices],
    },
    {
        title: "Visa Services",
        description: "We Help our Clients with visa lodgement and help them find the right visa option for their career.",
        icon: Globe,
        bgImage: bgImage3,
        items: visaServices,
    },
    {
        title: "Post-Academic Services",
        description: "After graduation some of our clients need additional steps to reach their career goal.",
        icon: Users,
        bgImage: bgImage4,
        items: postAcademicServices,
    },
];



const Services = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <main className="w-full">
            <Hero bgImage={HeroImage} heroName="Services" />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold  text-center text-midnight">Explore Our Comprehensive Services</h2>
                    <p className="text-gray-600 max-w-7xl mb-12  text-center mx-auto">We offer a range of services to support students and professionals at every stage of their journey, from education to career growth.</p>

                    {services.map((service, index) => (
                        <div key={index} className="space-y-2">
                            <MenuCard
                                {...service}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            />
                            <div className={`grid gap-4 overflow-hidden transition-all duration-300 ${activeIndex === index
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                                }`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
                                    {service.items.map((item, idx) => (
                                        <Link
                                            to={item.link}
                                            key={idx}
                                            className="p-6 bg-gray-100 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors group"
                                        >
                                            <span className="text-gray-800 group-hover:text-red-600 
                                            transition-colors font-bold">
                                                {item.label}
                                            </span>
                                            <span className="block mt-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Learn more →
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}



export default Services;