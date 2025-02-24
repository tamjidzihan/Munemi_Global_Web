import { ConsultationSection } from "../components/home/ConsultationSection";
import { ConsultantFinder } from "../components/home/ConsultantFinder";
import { Statistics } from "../components/home/Statistics";
import { ProcessSection } from "../components/home/ProcessSection";
// import { ImmigrationConsult } from "../components/home/ImmigrationConsult";
import { OverseasEducation } from "../components/home/OverseasEducation";
import { PartnerUniversities } from "../components/home/PartnerUniversities";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { NewsSection } from "../components/home/NewsSection";
import { ConsultationForm } from "../components/home/ConsultationForm";
import HeroSection from "../components/home/HeroSection";
import { GraduationCap, Users, Briefcase, Globe } from "lucide-react";
import { ServiceCard } from "../components/home/ServiceCard";

const HomePage = () => {
    const services = [
        {
            title: "Academic Services",
            description:
                "This services Services that help International Student in every steps of their career goal",
            icon: GraduationCap,
        },
        {
            title: "Essential Services",
            description:
                "Apart from the academic services we help our cilents with additional services.",
            icon: Briefcase,
        },
        {
            title: "Visa Services",
            description:
                "We Help our Clients with visa lodgement and help them find the right visa option for their career.",
            icon: Globe,
        },
        {
            title: "Post-Academic Services",
            description:
                "After graduation some of our clients need additional steps to reach their career goal.",
            icon: Users,
        },
    ];
    return (
        <main className="w-full">
            {/* <HeroSection /> */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
            <ConsultationSection />
            <ConsultantFinder />
            <Statistics />
            <ProcessSection />
            <OverseasEducation />
            <PartnerUniversities />
            <TestimonialsSection />
            <NewsSection />
            <ConsultationForm />

            {/* <ImmigrationConsult /> */}
            {/* 
           */}

        </main>
    )
}

export default HomePage