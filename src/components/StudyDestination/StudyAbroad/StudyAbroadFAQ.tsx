import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const StudyAbroadFAQ = () => {
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
            <Hero bgImage={HeroImg} heroName="Study Abroad FAQ" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Study Abroad FAQ</h2>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold">How can I get admission to Australian universities?</h3>
                            <p>
                                To get admission to an Australian university, you'll need to apply both to an institution and for a student visa from the Australian Government. The process includes the following steps:
                            </p>
                            <ul className="list-disc pl-8">
                                <li>Submitting an application to the institution</li>
                                <li>Applying for an Australian student visa</li>
                                <li>Providing necessary documents</li>
                                {/* You can expand the list of steps as needed */}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">What are the documents required to Study in Australia?</h3>
                            <p>Here are the documents generally required for a student’s visa:</p>
                            <ul className="list-disc pl-8">
                                <li>Completed Australian student visa application form (157A)</li>
                                <li>Paid visa application fee</li>
                                <li>Certificate of Enrollment or Letter of Offer</li>
                                <li>Copy of passport & Bio-data</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">What is the English test score required to Study in Australia?</h3>
                            <p>
                                The general IELTS score requirements for Australian universities are as follows:
                            </p>
                            <ul className="list-disc pl-8">
                                <li>Postgraduate: Minimum score of 6.5 overall, with no band less than 6.0</li>
                                <li>Undergraduate: Minimum score of 6.0 overall</li>
                            </ul>
                            <p>
                                Your required level of English language proficiency may vary depending on the institution and your level of study.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">What English language tests are accepted in Australia?</h3>
                            <p>These are the major English language proficiency tests accepted by Australian institutions:</p>
                            <ul className="list-disc pl-8">
                                <li>IELTS. The international English language testing system (IELTS) is one of the most popular English language proficiency tests for higher education and global migration, with millions of tests taken every year.</li>
                                <li>Test of English as a Foreign Language (TOEFL).</li>
                                <li>Pearson Test of English (PTE) Academic</li>
                                <li>Cambridge English: Advanced (CAE)</li>
                                <li>Occupational English Test (OET)</li>
                            </ul>
                            <p>
                                The validity of these test scores is typically two years.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">How many bands are required for PR in Australia?</h3>
                            <p>
                                The IELTS band requirement for permanent residency (PR) in Australia depends on the type of visa. To be eligible for some PR visas, you need at least 6 bands in each of the four test components of IELTS.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">IELTS Requirement for Top Universities in Australia</h3>
                            <p>Here are some of the IELTS requirements for top universities in Australia:</p>
                            <ul className="list-disc pl-8">
                                <li>
                                    <strong>University of Wollongong:</strong> No general IELTS requirement; the specific course requirements can be found on their website.
                                </li>
                                <li>
                                    <strong>Macquarie University:</strong> Minimum IELTS score of 6.5, with a 6.0 in each component.
                                </li>
                                <li>
                                    <strong>University of New South Wales:</strong> Minimum IELTS score of 6.5, with at least 6.0 in each component (exceptions may apply).
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default StudyAbroadFAQ;
