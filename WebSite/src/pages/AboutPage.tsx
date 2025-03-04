import Breadcrumb from "../components/Breadcrumb/Breadcrumb"
import HeroImg from "../assets/slide-1.jpg";
import Hero from "../components/common/Hero/Hero";
import { Statistics } from "../components/home/Statistics";
import { ProcessSection } from "../components/home/ProcessSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { ConsultationForm } from "../components/home/ConsultationForm";
import { NewsSection } from "../components/home/NewsSection";

const AboutPage = () => {
    return (
        <>
            <section className=" bg-red-500 ">
                <Breadcrumb />
            </section>
            <main className="w-full">
                <Hero bgImage={HeroImg} heroName="About Us" />
                <div className="px-4 py-10">
                    <section className="max-w-4xl mx-auto my-8">
                        <h2 className="text-2xl text-midnight font-semibold mb-4">
                            About Munemi Global Education & Migration Service
                        </h2>
                        <p>
                            Munemi Global Education & Migration Service is globally recognized for its excellent services in Education and Migration. As one of the fastest-growing educational and migration consulting firms, we have embarked on a journey with a team of devoted, versatile, and highly qualified experts. By utilizing cutting-edge technology, we provide exceptional services to international students and immigrants.
                        </p>

                        <p className="mt-4">
                            Our mission is to offer up-to-date, streamlined solutions for all education and migration inquiries. Whether you are looking for guidance on studying abroad or navigating migration processes, we are here to help you every step of the way.
                        </p>
                    </section>
                </div>
                <ProcessSection />
                <Statistics />
                <TestimonialsSection />
                <NewsSection />
                <ConsultationForm />
            </main>
        </>
    )
}

export default AboutPage