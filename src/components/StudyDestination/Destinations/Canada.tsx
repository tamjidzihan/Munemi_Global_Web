import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-4.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Canada = () => {
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
            <Hero bgImage={HeroImg} heroName="Canada" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Canada?</h2>
                    <p className="mb-4">
                        Canada offers a plethora of compelling reasons to study within its borders. First and foremost, Canadian universities consistently rank among the world’s best. Their academic programs are renowned for their quality and innovation, preparing students for successful careers on a global scale.
                    </p>
                    <p className="mb-4">
                        Moreover, Canada’s reputation for tolerance and inclusivity creates a welcoming environment for international students. The multicultural society offers students the opportunity to experience a variety of cultures, making their time in Canada both enriching and unique.
                    </p>
                    <p className="mb-4">
                        Beyond academics, Canada offers a high quality of life with its safe cities, beautiful natural landscapes, and world-class healthcare system. The country’s friendly atmosphere and abundant opportunities for personal and professional growth make it a top choice for students from around the world.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Canada;
