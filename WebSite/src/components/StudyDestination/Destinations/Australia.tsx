import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/australia_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Australia = () => {
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
            <Hero bgImage={HeroImg} heroName="Australia" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Australia?</h2>
                    <p className="mb-4">
                        Australia, a global education hub, beckons with its top-tier universities, vibrant multicultural society, and outstanding quality of life. With post-study work opportunities, diverse research options, and breathtaking natural beauty, it’s the ideal destination for an enriching academic journey.
                    </p>
                    <p className="mb-4">
                        It’s not just about education; it’s about embarking on a transformative experience that will shape your future. Australia offers a unique blend of world-class education, a rich cultural experience, and career opportunities that will help you grow both personally and professionally.
                    </p>
                    <p className="mb-4">
                        Whether you’re looking for high-quality academic programs, a safe and welcoming environment, or opportunities to explore nature and culture, Australia is an ideal choice for international students.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Australia;
