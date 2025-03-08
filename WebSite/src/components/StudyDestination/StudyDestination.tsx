import { useState } from "react";
import Hero from "../common/Hero/Hero";
import HeroImage from "../../assets/slide-1.jpg";
import bgImage1 from "../../assets/slide-2.jpg";
import bgImage2 from "../../assets/slide-3.jpg";
import { GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { MenuCard } from "../common/MenuCard/ServiceMenuCard";

const studyDestination = [
    { label: "Australia", link: "/study-destination/australia" },
    { label: "United States", link: "/study-destination/unitedstates" },
    { label: "Canada", link: "/study-destination/canada" },
    { label: "United Kingdom", link: "/study-destination/unitedkingdom" },
    { label: "Hungary", link: "/study-destination/hungary" },
    { label: "France", link: "/study-destination/france" },
    { label: "Saudi Arabia", link: "/study-destination/saudiarabia" },
    { label: "Spain", link: "/study-destination/spain" }
]

const studyAbroad = [
    { label: "Study Guides", link: "/study-destination/studyguides" },
    { label: "Global Career Pathway", link: "/study-destination/global-career-pathway" },
    { label: "Study Abroad FAQ", link: "/study-destination/study-abroad-faq" },
    { label: "Networking & Socialization", link: "/study-destination/networking-&-socialization" }
]

const studyServices = [
    {
        title: "Study Destination",
        description: "Services that help International Student in every steps of their career goal",
        icon: GraduationCap,
        bgImage: bgImage1,
        items: studyDestination,
    },
    {
        title: "Study Abroad",
        description: "Apart from the academic services we help our clients with additional services.",
        icon: Briefcase,
        bgImage: bgImage2,
        items: studyAbroad,
    }
];
const StudyDestination = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    return (
        <main className="w-full">
            <Hero bgImage={HeroImage} heroName="Study Destination" />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold  text-center text-midnight">Explore Our Study Destination</h2>
                    <p className="text-gray-600 max-w-7xl mb-12  text-center mx-auto">We offer a range of services to support students and professionals at every stage of their journey, from education to career growth.</p>
                    {studyServices.map((service, index) => (
                        <div key={index} className="space-y-2">
                            <MenuCard
                                {...service}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            />
                            <div className={`grid gap-4 mb-10 overflow-hidden transition-all duration-300 ${activeIndex === index
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                                }`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
                                    {service.items.map((item, idx) => (
                                        <Link
                                            to={item.link}
                                            key={idx}
                                            className="p-6 shadow bg-gray-100 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors group"
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
    )
}

export default StudyDestination