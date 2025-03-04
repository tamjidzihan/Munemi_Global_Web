import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const UnitedKingdom = () => {
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
            <Hero bgImage={HeroImg} heroName="United Kingdom" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in United Kingdom?</h2>
                    <p className="mb-4">
                        Studying in the United Kingdom (UK) has a lot to offer! Firstly, UK universities, like the famous Oxford and Cambridge, are known for their top-notch education. You’ll find a wide variety of courses to pick from, so you can study what truly interests you.
                    </p>
                    <p className="mb-4">
                        Plus, a degree from a UK university is respected worldwide, giving your future career a global boost. The UK is also home to a rich history and cultural diversity, making it an exciting and vibrant place to study.
                    </p>
                    <p className="mb-4">
                        In addition to the academic opportunities, international students can benefit from the UK’s strong connections with various industries, opening doors to internships, work experiences, and career opportunities post-graduation.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default UnitedKingdom;
