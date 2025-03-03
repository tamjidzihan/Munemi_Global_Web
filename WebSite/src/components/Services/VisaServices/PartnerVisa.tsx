import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const PartnerVisa = () => {
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
            <Hero bgImage={HeroImg} heroName="Partner Visa" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Partner Visa</h2>
                    <p className="mb-4">
                        In Australia, a partner visa is referred to as a spouse visa. Either the applicant must be an eligible New Zealand citizen or an Australian permanent resident in order to apply for citizenship through the Australian spouse. Also known as a spouse visa in Australia. A permanent resident is allowed to apply for a partner visa in Australia.
                    </p>
                    <p className="mb-4">
                        It will be difficult to pinpoint a specific number even if there are several spouse visa variations with various conditions and no predetermined expiration. After two years of cohabitation in Australia with their spouse, the holder of a partner visa for that country who is seeking a provisional visa will be eligible to reassess their application.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Visa Requirements for Partners</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The primary prerequisites for an Australian Spouse Visa are long-term and committed connections.</li>
                        <li>You share a permanent residence with your spouse.</li>
                        <li>The previous 12 months must have been spent in a marital relationship.</li>
                        <li>The character and health requirements must be met by both couples.</li>
                    </ul>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Duration of the Partner Visa</h2>
                    <p className="mb-4">
                        After two years of cohabitation in Australia with their spouse, the holder of a partner visa for that country who is seeking a provisional visa will be eligible to reassess their application. At the end of the first 24 months of a provisional partner visa, the immigration authorities assess the application again to see if the applicant still qualifies for an Australian permanent partner visa.
                    </p>
                    <p className="mb-4">
                        Once they have been granted permanent partner visas, the person is not required to continue their connection with their sponsor.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Why Choose Munemi Global?</h2>
                    <p className="mb-4">
                        Team Munemi Global is eagerly awaiting to help you throughout the whole process. Such programs are useful for students wishing to apply for permanent residency in Australia, as they contribute points towards the Department of Immigration and Border Protection (DIBP) ‘points test’ for visa applications.
                    </p>
                    <p className="mb-4">
                        For more information, feel free to reach out to us at <a href="tel:+8801978100105">+88 01978100105</a>.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default PartnerVisa;
