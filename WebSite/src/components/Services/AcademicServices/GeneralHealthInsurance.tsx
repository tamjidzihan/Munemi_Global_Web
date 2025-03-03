import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const GeneralHealthInsurance = () => {
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
            <Hero bgImage={HeroImg} heroName="General Health Insurance (OVHC)" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What is OVHC?</h2>
                    <p className="mb-4">
                        Overseas Visitors Health Cover (OVHC) is a health insurance designed for visitors to Australia who do not have access to Australia's public Medicare system for medical or hospital expenses.
                        OVHC insures against potential expenses you may incur if you require medical or hospital treatment.
                    </p>
                    <p className="mb-4">
                        In some cases, it may be a condition of your visa to hold a form of OVHC – for example, if you are working.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">What may not be covered?</h2>
                    <p className="mb-4">
                        Take care when purchasing cover, as some plans may have lower benefits or no benefits for certain types of treatment. Waiting periods can vary, and some policies may permanently exclude cover for pre-existing illnesses.
                    </p>
                    <p className="mb-4">
                        Most overseas visitors’ health cover products have limited cover for pharmaceuticals, and overseas visitors may face significant out-of-pocket costs for treatments like cancer care.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Where can I purchase OVHC?</h2>
                    <p className="mb-4">
                        OVHC can be purchased from certain health insurers and some general insurers based in Australia. You may also opt for insurance policies issued in other countries, but ensure they meet your visa's requirements.
                    </p>
                    <p className="mb-4">
                        It is recommended to search for "Overseas Visitors Health Cover" or "Overseas Visitors Insurance" online and compare policies from at least three providers.
                    </p>
                    <p className="mb-4">
                        Additionally, you may consider purchasing travel insurance for short stays, as it covers items not covered by OVHC, such as loss of travel goods and repatriation in a medical emergency.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Medicare: Australia’s Public Health System</h2>
                    <p className="mb-4">
                        Overseas visitors holding temporary visas are generally not eligible for Medicare, Australia's public health system. Without health cover, you may face significant out-of-pocket costs, even in public hospitals.
                    </p>
                    <p className="mb-4">
                        If you're unsure of your Medicare eligibility status, check with your local Medicare office or contact Medicare (Services Australia).
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Reciprocal Medicare</h2>
                    <p className="mb-4">
                        If you're from countries with a reciprocal health care agreement (e.g., the UK, Sweden, New Zealand), you may access emergency treatment under Medicare. However, certain limits apply, and private patient treatments are not covered.
                    </p>
                    <p className="mb-4">
                        You should consider OVHC to cover any items not included in the reciprocal agreement.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How the Medicare Levy Surcharge Might Affect You</h2>
                    <p className="mb-4">
                        If you are a high-income earner (over $90,000 as a single or $180,000 as a couple), are considered a resident in Australia for tax purposes, and have enrolled in Medicare, you may be affected by the Medicare Levy Surcharge.
                    </p>
                    <p className="mb-4">
                        Check the type of health insurance policy you need to be exempt from the surcharge.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default GeneralHealthInsurance;
