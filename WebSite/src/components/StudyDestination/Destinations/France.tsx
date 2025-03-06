import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/french_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const France = () => {
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
            <Hero bgImage={HeroImg} heroName="France" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">WHY STUDY IN FRANCE?</h2>
                    <p className="mb-4">
                        Paris, the heart of France, is a global hub for education, culture, and innovation, attracting students from all over the world. With its rich history, artistic heritage, and vibrant academic scene, France offers a unique and inspiring environment for higher education.
                    </p>
                    <p className="mb-4">
                        Renowned for its prestigious universities and grandes écoles, France provides top-tier programs in diverse fields such as business, engineering, arts, and humanities. The country’s emphasis on research and innovation makes it an excellent destination for students looking to excel in their careers.
                    </p>
                    <p className="mb-4">
                        Beyond academics, France offers an unparalleled cultural experience, from world-famous museums and cuisine to lively student life and breathtaking landscapes. Studying in France is not just about education—it’s about immersing yourself in a dynamic and globally connected environment that broadens your horizons.
                    </p>

                </section>
            </div>
        </main>
    );
};

export default France;
