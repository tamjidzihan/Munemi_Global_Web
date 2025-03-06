import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/spain_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Spain = () => {
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
            <Hero bgImage={HeroImg} heroName="Spain" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Spain?</h2>
                    <p className="mb-4">
                        Spain, a vibrant and culturally rich country in Europe, is an excellent destination for international students. With its world-class universities, diverse academic programs, and lively atmosphere, Spain offers an enriching and dynamic educational experience.
                    </p>
                    <p className="mb-4">
                        Spanish universities are renowned for their excellence in research, innovation, and academic rigor. Offering programs in both Spanish and English, institutions like the University of Barcelona and Complutense University of Madrid provide students with globally recognized degrees across various fields, including business, engineering, humanities, and sciences.
                    </p>
                    <p className="mb-4">
                        Beyond academics, Spain’s breathtaking landscapes, warm climate, and rich cultural heritage make it a fantastic place to live and study. Whether exploring historic cities, enjoying Mediterranean cuisine, or immersing yourself in the country's lively festivals, studying in Spain provides a unique blend of education and adventure.
                    </p>
                </section>
            </div>

        </main>
    );
};

export default Spain;
