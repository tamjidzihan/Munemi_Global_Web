import { Statistics } from "../components/home/Statistics";
import { OverseasEducation } from "../components/home/OverseasEducation";
import HeroSection from "../components/home/HeroSection";
import { GraduationCap, Users, Briefcase, Globe } from "lucide-react";
import { ServiceCard } from "../components/home/ServiceCard";
import { AppointmentBoking } from "../components/home/AppointmentBoking";
import { PartnerUniversities } from "../components/home/PartnerUniversities";
import PageTitle from "../admin/components/PageTitle";
import { PopularDestination } from "../components/home/PopularDestination";
import AirTicketBooking from "../components/home/AirTicketBooking";
// import TestimonialCarousel from "../components/home/TestimonialCarousel";
import PopularPackage from "../components/home/PopularPackage";
import { BlogPostGrid } from "../components/home/BlogPostCard";

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
            <PageTitle title="Home | Munemi Global" />
            <HeroSection />
            <PopularPackage />
            <AirTicketBooking />
            <BlogPostGrid />
            <section className="py-20 px-4 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-midnight">
                        Our Services
                    </h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">

                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
            <AppointmentBoking />
            <PopularDestination />
            <OverseasEducation />
            <PartnerUniversities />

            {/* <TestimonialCarousel /> */}
            <Statistics />
        </main>
    )
}

export default HomePage