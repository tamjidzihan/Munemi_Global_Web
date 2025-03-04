import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-1.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const PermanentResidency = () => {
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
            <Hero bgImage={HeroImg} heroName="Permanent Residency" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">How many bands are required for PR in Australia?</h2>
                    <p className="mb-4">
                        To get admission to an Australian university, you'll need to apply for both admission to an institution and a student visa from the Australian Government.
                    </p>
                    <p className="mb-4">
                        The steps you must go through include the following:
                    </p>

                    <ul className="list-decimal list-inside space-y-4 mt-2">
                        <li>
                            <strong>Submit an Expression of Interest (EOI):</strong> This step is essential for skilled migration. You'll need to submit an EOI through SkillSelect, which is the Australian government’s online system. Based on your qualifications, work experience, and other factors, you will receive a points score. The higher your points, the better your chances of receiving an invitation to apply for permanent residency.
                        </li>
                        <li>
                            <strong> Choose the appropriate visa subclass:</strong> Depending on your occupation, skills, and the type of job you are looking for in Australia, you will need to choose a visa subclass. Some popular visa subclasses for PR are Subclass 189 (Skilled Independent Visa), Subclass 190 (Skilled Nominated Visa), and Subclass 491 (Skilled Work Regional (Provisional) Visa).
                        </li>
                        <li>
                            <strong> Meet the minimum points requirement:</strong> To be eligible for PR, you must score a minimum number of points based on the points test, which considers factors like age, English proficiency, work experience, education qualifications, and other skills.
                        </li>
                        <li>
                            <strong>Take a language proficiency test:</strong> A high level of English language proficiency is required. You must take an approved English test such as IELTS, PTE, or TOEFL to demonstrate your language ability. Typically, a score of 6.0-7.0 bands in IELTS is required, depending on the visa subclass you apply for.
                        </li>
                        <li>
                            <strong>Obtain a skills assessment:</strong> A skills assessment is required to demonstrate that your qualifications and work experience meet Australian standards for the occupation you're applying under. This is usually done by a relevant assessing authority.
                        </li>
                        <li>
                            <strong>Submit your application for PR:</strong> Once you have received an invitation to apply, you can submit your permanent residency application along with all the required documents, such as proof of your English proficiency, skills assessment, and health checks.
                        </li>
                        <li>
                            <strong>Health and character checks:</strong> Applicants must undergo a health examination to ensure they meet the health standards set by the Australian government. Additionally, a police clearance certificate is required to ensure the applicant has a good character.
                        </li>
                        <li>
                            <strong>Wait for a decision:</strong> After submission, your application will be processed, and you’ll be notified about the outcome. The processing time can vary, so be prepared for potential delays.
                        </li>
                    </ul>

                    <p className="mt-4">
                        By following these steps and meeting the necessary requirements, you can increase your chances of obtaining permanent residency in Australia.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default PermanentResidency;
