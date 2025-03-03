import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const PreDeparture = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="w-full">
            <Hero bgImage={HeroImg} heroName="Pre-Departure" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Pre-Departure Briefing</h2>
                    <p className="mb-4">
                        After OPTEK International has completed the visa process, each employee is provided a detailed handbook.
                        Purchasing a ticket ensures that you have a large support network so that you may get the most out of your university experience.
                        We'll assist you with adjusting to life in Australia, making new friends, achieving academic success, and preparing for life after university.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Offerings</h2>
                    <p className="mb-4">
                        We offer students advice on how to pack and travel on a per-departure basis.
                        Students are also instructed on what to do once they get to the Australian airport.
                        You will always have our supervision and support, not just in terms of instruction but also in terms of mental and physical health.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Guidance</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Register for a student visa and prepare for your departure, including enrolling online.</li>
                        <li>Understand costs of living and banking alternatives in Australia.</li>
                        <li>Coordinate internet and cell phone coverage.</li>
                        <li>Arrange suitable lodging options.</li>
                        <li>Prepare for airport arrival and safety measures.</li>
                        <li>Comprehensive checklist of pre-departure requirements.</li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default PreDeparture;
