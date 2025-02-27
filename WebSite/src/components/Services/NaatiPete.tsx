import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import HeroImg from "../../assets/slide-1.jpg";
import Hero from "../common/Hero/Hero";

const NAATIPTE = () => {
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
            <Hero bgImage={HeroImg} heroName="NAATI/PTE" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">NAATI/PTE</h2>
                    <p className="mb-4">
                        The NAATI (National standards and certifying authority for translators and interpreters in Australia) CCL tests a candidate's ability to transfer the meaning of a conversation from English to a LOTE (Language Other Than English).
                    </p>
                    <p className="mb-4">
                        High professional standards for the translating and interpreting sector are set, maintained, and promoted by NAATI.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">WHY IS NAATI NECESSARY TO BE FLUENT IN ENGLISH?</h2>
                    <p className="mb-4">
                        English proficiency is an indispensable skill to acquire in our contemporary era. It substantially increases one’s chances of gaining admittance to a renowned university, and furthering PTE academic training can foster one’s passion for working and residing in Australia.
                    </p>
                    <p className="mb-4">
                        Students taking NAATI/PTE examinations are tested to demonstrate higher levels of language proficiency. This is why PFEC Global offers the most comprehensive resources and access to PTE academic coaching classes in Melbourne and other regions of Australia: we endeavor to assist students achieve their ambitions!
                    </p>
                    <p className="mb-4">
                        Thus, taking advantage of PTE preparation courses can enhance your chances of admission to any college of your choosing; or, even more conveniently, allow you to simply exit the system with increased confirmations in English Language Proficiency. Ultimately NAATI/PTE exams provide an invaluable supplement to fundamental and academic advantages and passing them isn’t difficult at all!
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">WHAT ARE THE BENEFITS OF HAVING NAATI/PTE IN AUSTRALIA?</h2>
                    <p className="mb-4">
                        Achievement of NAATI/PTE academic benchmark results provides numerous benefits, chief among them the assurance of admission into any college or university in Australia. Furthermore, with NAATI/PTE being an internationally recognized certification, it opens up opportunities for you in many different parts of the world.
                    </p>
                    <p className="mb-4">
                        PFEC Global can provide you with all the resources and support you need to pass NAATI/PTE exams with flying colors. We are passionate about providing our students with the best possible preparation and we would be happy to recommend one of our centers that offers a flexible course schedule and excellent facilities.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">WHAT ARE THE BENEFITS OF HAVING NAATI/PTE IN AUSTRALIA?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Translators and interpreters accredited in Australia are typically vetted through rigorous examinations authorized by NAATI officials.</li>
                        <li>Expedites the process of attaining 5-Points extra on your path toward Australian PR.</li>
                        <li>PTE is crucial to Australian PR, as a PTE score for Australian PR warrants at least 65 points. 189 or 190 marks are mandatory for obtaining an Australia visa; any rating below this threshold will not be accepted.</li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default NAATIPTE;