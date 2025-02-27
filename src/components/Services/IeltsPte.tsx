import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import HeroImg from "../../assets/slide-2.jpg";
import Hero from "../common/Hero/Hero";

const IELTS_PTE = () => {
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
            <Hero bgImage={HeroImg} heroName="IELTS/PTE" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">IELTS/PTE English Qualification Tests</h2>
                    <p className="mb-4">
                        The English Qualification Test is a vital requirement for students wishing to study abroad. It is an essential benchmark to evaluate the proficiency of non-native speakers in the English language. At Munemi Global, we offer students comprehensive preparation and support for two of the most renowned English Qualification Tests: the PTE (Pearson Test of English) and IELTS (International English Language Testing System). Our services provide study materials, mock exams, and personalized coaching to help students excel in these exams and achieve their desired scores.
                    </p>
                    <p className="mb-4">
                        Preparing for these exams requires consistent practice and familiarity with the test format. Whether you're targeting a university in Australia, the UK, New Zealand, or another English-speaking country, Munemi Global is here to guide you every step of the way. We ensure you receive the best resources and expert assistance to help you achieve the highest possible score.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h3 className="text-xl text-midnight font-semibold mb-4">PTE (Pearson Test of English)</h3>
                    <p className="mb-4">
                        The Pearson Test of English (PTE) was established more than ten years ago with the aim of providing the most secure, reliable, and accurate English language test. Today, over 3,000 colleges, organizations, and professional bodies worldwide rely on PTE to assess English proficiency for academic and immigration purposes. Governments of major English-speaking countries such as Australia, New Zealand, and the UK recognize PTE as valid evidence of English proficiency for immigration at all levels.
                    </p>
                    <p className="mb-4">
                        PTE Academic is a computer-based test designed for non-native English speakers who wish to pursue higher education abroad. It evaluates all four language skills: reading, listening, speaking, and writing. One unique feature of the PTE test is that questions often assess multiple skills at the same time, such as speaking and reading together or listening and reading. The entire test is completed in one sitting over a three-hour period in a secure environment while you sit at a computer.
                    </p>
                    <p className="mb-4">
                        The speaking section of the test is conducted online, where your voice is recorded and later evaluated. One of the key advantages of the PTE is the quick turnaround time for results—most candidates receive their scores within 48 hours, allowing for a swift process compared to other language exams.
                    </p>
                    <p className="mb-4">
                        At Munemi Global, our expert team is here to support you through every stage of your PTE preparation. We provide a variety of study resources, including practice tests, workshops, and one-on-one coaching sessions to ensure that you are fully prepared for the exam. Our services are designed to enhance your confidence and help you achieve the best possible score.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h3 className="text-xl text-midnight font-semibold mb-4">IELTS (International English Language Testing System)</h3>
                    <p className="mb-4">
                        IELTS has been a trusted test of English language proficiency for over 25 years, providing a reliable measure of your ability to use English in academic, professional, and migration settings. More than 3 million people take the IELTS test every year, and it is recognized by over 11,000 organizations worldwide, including universities, colleges, schools, and government bodies. IELTS is widely regarded as the most respected test of English in the world.
                    </p>
                    <p className="mb-4">
                        IELTS offers two versions: the Academic test and the General Training test. While the Speaking and Listening sections are the same in both tests, the Reading and Writing components differ. The Academic test is intended for students who wish to study at the undergraduate or postgraduate level, while the General Training test is designed for those seeking to migrate or work in English-speaking countries.
                    </p>
                    <p className="mb-4">
                        IELTS can be taken either on paper or on a computer, based on your preference and availability. The test scores are valid for two years, and IELTS uses a band score system ranging from 0 to 9 to measure English proficiency. You might receive a band score like 8, indicating a high level of proficiency. The test provides a detailed assessment of your language skills, including listening, reading, writing, and speaking, and is often a key requirement for English-speaking universities and immigration processes.
                    </p>
                    <p className="mb-4">
                        With over 10,000 organizations in more than 140 countries accepting IELTS, it is one of the most widely recognized English language tests in the world. At Munemi Global, we offer comprehensive IELTS preparation programs, designed to help you achieve your target band score. Our highly qualified instructors provide tailored training, focusing on improving your weaknesses and enhancing your strengths, ensuring that you are fully prepared for the test.
                    </p>
                    <p className="mb-4">
                        We understand the importance of the IELTS exam in your academic and professional goals, and we are committed to helping you succeed. Munemi Global will provide you with study materials, practice exams, and personalized coaching to ensure that you are well-prepared and confident on test day. Our experts will guide you through every step of the process, from understanding the test format to mastering essential test-taking strategies.
                    </p>
                    <p className="mb-4">
                        Whether you're aiming for top universities or seeking immigration opportunities, IELTS is a requirement for all English-speaking institutions and governments. At Munemi Global, we will ensure that you are equipped with the knowledge and skills to succeed in this critical exam.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto my-8">
                    <h3 className="text-xl text-midnight font-semibold mb-4">PTE vs IELTS: Which is Right for You?</h3>
                    <p className="mb-4">
                        The PTE and IELTS are both respected English language proficiency tests that are widely accepted by academic institutions, governments, and employers worldwide. However, each test has unique features that may make one more suitable for your specific needs. While IELTS has been around for longer and is more widely known, PTE is a newer option that offers quicker results and a fully computer-based testing process. Choosing the right test depends on factors like your preferred test format, the country you plan to study or work in, and the type of institutions you wish to apply to.
                    </p>
                    <p className="mb-4">
                        Munemi Global is here to help you determine which test is best for you based on your specific goals and requirements. Our expert advisors will provide personalized recommendations and guidance to ensure that you choose the right test and get the preparation you need to succeed.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default IELTS_PTE;
