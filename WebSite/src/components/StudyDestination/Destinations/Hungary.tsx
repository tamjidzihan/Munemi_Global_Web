import { useEffect, useState } from "react";
import HeroImg from "../../../assets/flags/hungary_flag.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const Hungary = () => {
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
            <Hero bgImage={HeroImg} heroName="Hungary" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Study in Hungary?</h2>
                    <p className="mb-4">
                        Hungary offers world-class education, stunning landscapes, and a warm welcome. Renowned universities ensure top-tier learning, while safety and diversity create a comfortable environment.
                    </p>
                    <p className="mb-4">
                        Outdoor adventures await amidst picturesque mountains and beaches, providing a perfect balance between academic and leisure time. English as the primary language helps to improve language skills while living in a truly multicultural society.
                    </p>
                    <p className="mb-4">
                        Additionally, Hungary is known for its research opportunities and strong work prospects. Students can gain valuable hands-on experience, enhancing their qualifications and employability.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Hungary;
