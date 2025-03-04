import { useEffect, useState } from "react";
import HeroImg from "../../../assets/slide-2.jpg";
import Loader from "../../common/Loader";
import Hero from "../../common/Hero/Hero";

const NetworkingAndSocialization = () => {
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
            <Hero bgImage={HeroImg} heroName="Networking and Socialization" />
            <div className="px-4">
                <section className="max-w-4xl mx-auto my-8">
                    <h2 className="text-2xl text-midnight font-semibold mb-4">Networking and Socialization</h2>
                    <p>
                        Forming connections, both personal and professional, is extremely important and valuable when studying and working abroad. Some people say, “it’s not what you know, but whom you know,” and we believe that it requires both to find opportunities. You need to know the right stuff and the right people. Kangaroo Global knows how overwhelming moving to a new country can be, and we are here to support you.
                    </p>
                    <div className="space-y-8 mt-6">
                        <div>
                            <h3 className="text-xl font-semibold">Engage with your teachers</h3>
                            <p>
                                If you are looking for industry connections, the best people to go to are your teachers and the organizations they work for. Even if they don’t have a direct connection to someone who can help you, they can guide you on where to find the right person. They can also become valuable mentors by providing study and work advice, serving as references, and connecting you with useful contacts. Teachers often have access to networking events and job opportunities, which can help expose you to the industry and professional landscape.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Attend events</h3>
                            <p>
                                Events such as networking events, seminars, and workshops are great for forming industry connections. These events are designed to connect like-minded individuals and provide opportunities to meet industry leaders and experts. By attending such events, you’ll not only make new connections but also increase your visibility in the professional world. Kangaroo Global and your institution will help you find these events, and continuous attendance will help solidify your place in the industry.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Social media</h3>
                            <p>
                                Social networking is one of the easiest and most accessible ways to build connections. While platforms like Instagram and Facebook are great for personal connections, LinkedIn and Twitter are better suited for professional networking. On these platforms, you can promote your skills, find job opportunities, and engage with companies, organizations, and institutions. Be sure to follow Kangaroo Global to stay updated on events and opportunities. The power to network is literally at your fingertips!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default NetworkingAndSocialization;
