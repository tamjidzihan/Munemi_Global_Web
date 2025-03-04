import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const UAE = () => {
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
            <Hero bgImage={HeroImg} heroName="United Arab Emirates" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">WHY STUDY IN DUBAI?</h2>
                    <p className="mb-4">
                        Dubai, a captivating jewel of the United Arab Emirates, beckons students worldwide with unique educational opportunities. Situated at the crossroads of Europe, Asia, and Africa, Dubai offers a diverse, cosmopolitan environment that enriches your global perspective.
                    </p>
                    <p className="mb-4">
                        Renowned for its academic excellence and world-class facilities, Dubai houses prestigious universities and institutions offering a wide range of programs. The city's growing reputation as a global hub for business, technology, and innovation makes it an ideal destination for students aspiring to enter these fields.
                    </p>
                    <p className="mb-4">
                        Aside from academics, Dubai's dynamic lifestyle, world-class infrastructure, and multicultural environment provide an exciting and enriching experience for students. It’s not only an educational destination but also a place to build international connections and gain exposure to global industries.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default UAE;
