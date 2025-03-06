import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/saudiarabia_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const SaudiArabia = () => {
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
            <Hero bgImage={HeroImg} heroName="Saudi Arabia" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Saudi Arabia?</h2>
                    <p className="mb-4">
                        Saudi Arabia offers a unique and dynamic educational experience for international students. With its rapidly growing higher education sector, advanced research facilities, and commitment to academic excellence, the country is an emerging hub for learning and innovation.
                    </p>
                    <p className="mb-4">
                        Home to prestigious universities such as King Fahd University of Petroleum & Minerals and King Saud University, Saudi Arabia provides a wide range of programs in fields like engineering, medicine, business, and Islamic studies. Many institutions collaborate with globally recognized universities, ensuring high-quality education and research opportunities.
                    </p>
                    <p className="mb-4">
                        Beyond academics, Saudi Arabia offers a rich cultural heritage, modern infrastructure, and a strong economy, making it an attractive destination for students seeking personal and professional growth. With generous scholarships, advanced technology-driven campuses, and a commitment to Vision 2030, studying in Saudi Arabia is a pathway to global opportunities.
                    </p>
                </section>
            </div>

        </main>
    );
};

export default SaudiArabia;
