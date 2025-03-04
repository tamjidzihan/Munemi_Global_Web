import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Malaysia = () => {
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
            <Hero bgImage={HeroImg} heroName="Malaysia" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Malaysia?</h2>
                    <p className="mb-4">
                        Malaysia offers a diverse and enriching environment for international students. Its world-class education system, affordable living costs, and vibrant culture make it an attractive destination for students from across the globe.
                    </p>
                    <p className="mb-4">
                        Malaysia's universities consistently rank among the top in the world, with a wide variety of courses available in fields such as engineering, business, and medicine. The country is home to several prestigious institutions that offer degrees in partnership with renowned universities from the UK, Australia, and the US.
                    </p>
                    <p className="mb-4">
                        Malaysia is known for its multicultural society, making it a great place for students to experience and learn from various cultures while pursuing their studies. The combination of modern infrastructure, diverse traditions, and affordable tuition fees ensures that students can enjoy both a quality education and a comfortable lifestyle.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Malaysia;
