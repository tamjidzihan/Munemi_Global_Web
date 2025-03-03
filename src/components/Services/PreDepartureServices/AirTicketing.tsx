import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const AirTicketing = () => {
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
            <Hero bgImage={HeroImg} heroName="Air Ticketing" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Air Ticketing</h2>
                    <p className="mb-4">
                        Booking Air Ticket

                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Please contact us regional office.</li>

                    </ul>
                </section>
            </div>

        </main>
    )
}

export default AirTicketing