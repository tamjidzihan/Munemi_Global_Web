import {
    GraduationCap,
    CreditCard,
    Users,
    Briefcase,
    Globe,
    BoxIcon,
} from "lucide-react";
import { ServiceCard } from "../components/home/ServiceCard";
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
            <section className="relative h-[600px] flex items-center justify-center text-center text-white bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <p className="text-lg mb-4">We have 20+ years experience in</p>
                    <h1 className="text-5xl font-bold mb-6">
                        IMMIGRATION & VISA CONSULTATION
                    </h1>
                    <p className="text-lg mb-8">
                        Feugiat primis ligula risus auctor egestas augue mauri viverra
                        tortor in iaculis placerat eugiat mauris ipsum in viverra tortor and
                        gravida purus lorem in tortor
                    </p>
                    <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600">
                        BOOK CONSULTATION NOW
                    </button>
                </div>
            </section>
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
            <ImmigrationConsult />
            <OverseasEducation />
            <PartnerUniversities />
            <TestimonialsSection />
            <NewsSection />
            <ConsultationForm />

        </main>
    )
}

export default HomePage