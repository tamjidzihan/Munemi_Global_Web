import image1 from "../../assets/Image_1.png";
import image2 from "../../assets/Image_2.jpg";
import image3 from "../../assets/Image_3.jpg";

const articles = [
    {
        category: "Immigration Visa",
        readTime: "2 min read",
        title: "What visa do you need to work legally in Singapore?",
        description:
            "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien. Quaerat neque purus ipsum neque dolor primis",
        image: image1,
        author: "Jhon doe",
        date: "February 26, 2020",
    },
    {
        category: "Working Visa",
        readTime: "2 min read",
        title: "Top reasons for Australian working visa rejection",
        description:
            "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien libero tempus impedit tempor blandit sapien gravida",
        image: image2,
        author: "Jhon doe",
        date: "February 26, 2020",
    },
    {
        category: "Working Visa",
        readTime: "2 min read",
        title: "Canada Federal Skilled Worker Program",
        description:
            "Aliqum mullam blandit tempor sapien gravida donec ipsum, at porta justo. Velna vitae auctor congue magna tempor sodales sapien donec ipsum, at porta justo purus ipsum neque",
        image: image3,
        author: "Jhon doe",
        date: "February 26, 2020",
    },
];
export function NewsSection() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl text-midnight font-bold text-center mb-4">
                    Our Stories & Latest News
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Cursus porta, feugiat primis in ultrice ligula risus auctor tempus
                    dolor feugiat, felis lacinia risus interdum auctor id viverra dolor
                    iaculis luctus placerat and massa
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div key={index} className="group">
                            <div className="mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span>{article.category}</span>
                                <span>–</span>
                                <span>{article.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-red-500">
                                <a href="#">{article.title}</a>
                            </h3>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            <div className="text-sm text-gray-600">
                                <span>by </span>
                                <a href="#" className="font-medium hover:text-red-500">
                                    {article.author}
                                </a>
                                <span> – {article.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
