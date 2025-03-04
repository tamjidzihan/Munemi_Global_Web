import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg"; // Update this path
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const StudyGuides = () => {
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
            <Hero bgImage={HeroImg} heroName="Study Guides" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Study Guides</h2>
                    <p className="mb-4">
                        Let’s face it: Studying can be hard. Even if the material is interesting, it can be difficult to memorize and understand everything. If it was easy to do, everyone in the world would be a professional at something. That said, there are many techniques that help to enhance the effectiveness of the time and effort put into studying.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Noise</h3>
                    <p className="mb-4">
                        Very closely related to location, the amount of sound in the environment plays an important role in studying. For some people, absolute silence is optimal as it allows them to focus entirely on the task at hand with no distractions. This can be achieved by studying in a library or at home, or even in a more loud room but with noise-canceling earphones.
                    </p>
                    <p className="mb-4">
                        This style of studying in silence may not work for everyone. As with locations, a quiet study time may prove to be too isolated and intense for some, who would rather study with a bit of background noise, in which case choosing a location such as a café or on-campus study room is advisable. Sound can also be added by listening to music, which can help people focus on tasks by giving them rhythm and stimulating their brains. Experts recommend no more than 70 decibels of ambient noise.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Time of the day</h3>
                    <p className="mb-4">
                        Studying during the day usually means that you have more energy and the natural lighting makes it easier to stay awake and concentrate. More locations will be available to study at, and it is easier to contact people if you have any questions. The negative side is that most of the locations will be busy during the day, and there are just generally more distractions during the daytime.
                    </p>
                    <p className="mb-4">
                        Meanwhile, studying at night-time provides quieter, but locations will be harder to find and it will be more difficult to communicate with others if you have any questions. Night-time is also known for stimulating creativity, but it can also lead to tiredness.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Duration of Study</h3>
                    <p className="mb-4">
                        This depends completely upon the individual and their preferences and capacity. Ideally, your study is not done all at once in one long study session and is done in many segments over the duration of your course. Studying for too long can lead to fatigue and lack of concentration, and you will not absorb everything.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Breaks</h3>
                    <p className="mb-4">
                        The optimal study routine is to study for 50 minutes and have a 10-minute break. Breaks are important because they allow the mind to refresh and to process what has been absorbed, instead of constantly bombarding it with new information. During your breaks, you should change your environment and activity; eat some food, do some physical activity, or at least watch or listen to something entertaining.
                    </p>

                    <h3 className="text-xl font-semibold mt-4">Alone or in a Group?</h3>
                    <p className="mb-4">
                        Kangaroo Global recommends a mix of both studying alone and in a group. Studying alone allows you to go at your own speed, focus completely on the material, and avoid distractions. Studying in a group allows you to test, teach, correct, and motivate each other, but may also lead to distractions. It is important to choose the people you study with carefully, and to ensure that they are serious about study and able to assist you.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default StudyGuides;
