import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import HeroImg from "../../assets/slide-1.jpg";
import Hero from "../common/Hero/Hero";

const AirportPickup = () => {
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
            <Hero bgImage={HeroImg} heroName="Airport Pickup Service" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Australia Airport Pickup Services</h2>
                    <p className="mb-4">
                        Customs and immigration clearances are required after arrival at an Australian airport. If you want assistance, a border official may be able to assist you or answer any questions you may have. A clearance officer will inspect you for your visa and travel documents. Sometimes students become panicked and unable to perform properly.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Help from Us</h2>
                    <p className="mb-4">
                        In order to stimulate and assist you, Munemi Global will brief you on the situation before departure. Students will be allowed to receive their bags once they have completed customs and quarantine. The Department of Home Affairs website has information on arriving at Australian airports, and we will also send you a reminder. If you need any assistance for airport pickup, our person will be there to assist you.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Choose Munemi Global?</h2>
                    <p className="mb-4">
                        Team Munemi Global is here to guide you through the airport arrival process and ensure a smooth and stress-free journey. We understand how overwhelming it can be, and we are committed to making your experience as seamless as possible.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default AirportPickup;
