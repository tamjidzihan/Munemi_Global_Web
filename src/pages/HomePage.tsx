
import { ConsultationSection } from "../components/home/ConsultationSection";
import { ConsultantFinder } from "../components/home/ConsultantFinder";
import { Statistics } from "../components/home/Statistics";
import { ProcessSection } from "../components/home/ProcessSection";
import { ImmigrationConsult } from "../components/home/ImmigrationConsult";
import { OverseasEducation } from "../components/home/OverseasEducation";
import { PartnerUniversities } from "../components/home/PartnerUniversities";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { NewsSection } from "../components/home/NewsSection";
import { ConsultationForm } from "../components/home/ConsultationForm";
import HeroSection from "../components/home/HeroSection";
import { GraduationCap, CreditCard, BoxIcon, Users, Briefcase, Globe } from "lucide-react";
import { ServiceCard } from "../components/home/ServiceCard";

const HomePage = () => {
    const services = [
        {
            title: "Education Visa",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: GraduationCap,
        },
        {
            title: "Business Immigration",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: CreditCard,
        },
        {
            title: "Skilled Immigration",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: BoxIcon,
        },
        {
            title: "Spouse/Family Visas",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: Users,
        },
        {
            title: "Tourist & Visitor Visas",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: Briefcase,
        },
        {
            title: "Resident Return Visas",
            description:
                "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta..",
            icon: Globe,
        },
    ];
    return (
        <main className="w-full">
            <HeroSection />
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
            <ConsultationSection />
            <ConsultantFinder />
            <Statistics />
            <ProcessSection />
            {/* <ImmigrationConsult /> */}
            {/* 
            <OverseasEducation />
            <PartnerUniversities />
            <TestimonialsSection />
            <NewsSection />
            <ConsultationForm /> */}

        </main>
    )
}

export default HomePage