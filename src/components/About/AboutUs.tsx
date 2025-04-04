import Hero from "../common/Hero/Hero"
import { AppointmentBoking } from "../home/AppointmentBoking"
import { NewsSection } from "../home/NewsSection"
import { ProcessSection } from "../home/ProcessSection"
import { Statistics } from "../home/Statistics"
import { TestimonialsSection } from "../home/TestimonialsSection"
import { BoardMembers } from "./BoardMembers"
import HeroImg from "../../assets/slide-1.jpg";

const AboutUs = () => {
    return (
        <main className="w-full">
            <Hero bgImage={HeroImg} heroName="About Us" />
            <div className="px-4 py-10">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-3xl text-center text-midnight font-semibold mb-6">
                        About Munemi Global Education & Migration Service
                    </h2>
                    <p className="text-gray-600">
                        Munemi Global Education & Migration Service is globally recognized for its excellent services in Education and Migration. As one of the fastest-growing educational and migration consulting firms, we have embarked on a journey with a team of devoted, versatile, and highly qualified experts. By utilizing cutting-edge technology, we provide exceptional services to international students and immigrants.
                    </p>

                    <p className="mt-4 text-gray-600">
                        Our mission is to offer up-to-date, streamlined solutions for all education and migration inquiries. Whether you are looking for guidance on studying abroad or navigating migration processes, we are here to help you every step of the way.
                    </p>
                </section>
            </div>
            <BoardMembers />
            <ProcessSection />
            <Statistics />
            <TestimonialsSection />
            <NewsSection />
            <AppointmentBoking />
        </main>
    )
}

export default AboutUs