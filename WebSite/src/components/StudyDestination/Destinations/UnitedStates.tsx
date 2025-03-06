import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/usa_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const UnitedStates = () => {
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
            <Hero bgImage={HeroImg} heroName="United States" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in The USA?</h2>
                    <p className="mb-4">
                        The United States beckons international students with a unique blend of academic excellence and boundless opportunity. Renowned for its world-class universities, the USA offers cutting-edge programs and esteemed faculty.
                    </p>
                    <p className="mb-4">
                        Its multicultural society enriches the educational experience, fostering a global perspective. Beyond academics, students have access to a wealth of extracurricular activities, networking opportunities, and diverse job markets that can shape their futures in exciting ways.
                    </p>
                    <p className="mb-4">
                        Whether you’re looking to pursue advanced research, gain hands-on industry experience, or experience life in one of the most diverse countries in the world, the United States offers endless possibilities for personal and professional growth.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default UnitedStates;
