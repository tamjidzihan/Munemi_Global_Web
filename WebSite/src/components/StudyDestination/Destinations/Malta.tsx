import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Malta = () => {
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
            <Hero bgImage={HeroImg} heroName="Malta" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Malta?</h2>
                    <p className="mb-4">
                        Malta, a beautiful island in the Mediterranean, is quickly becoming a sought-after destination for international students. Known for its rich history, vibrant culture, and high-quality education system, Malta offers a unique educational experience.
                    </p>
                    <p className="mb-4">
                        Maltese universities provide a wide range of undergraduate and postgraduate courses in English, with an emphasis on research, innovation, and practical learning. The country has strong ties with the UK and other European nations, ensuring that students receive globally recognized qualifications.
                    </p>
                    <p className="mb-4">
                        Besides academic excellence, Malta's stunning landscapes, warm climate, and safe, welcoming environment make it an ideal place to live and study. The small size of the island fosters a close-knit community, allowing international students to feel at home while pursuing their studies.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Malta;
