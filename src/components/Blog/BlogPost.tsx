import { Facebook, Twitter, Linkedin } from 'lucide-react'

export function BlogPost() {
    return (
        <div className="lg:col-span-2">
            <article className="bg-white max-w-2xl  rounded-xl overflow-hidden shadow-sm">
                <img
                    src="https://images.unsplash.com/photo-1565967511849-76a60a516170"
                    alt="Featured"
                    className="w-full h-96 object-cover"
                />
                <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>Immigration Visa</span>
                        <span>—</span>
                        <span>2 min read</span>
                    </div>
                    <h1 className="text-3xl text-midnight font-bold mb-4">
                        What visa do you need to work legally in Singapore?
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <span>by </span>
                        <a href="#" className="font-medium hover:text-red-500">
                            Jhon doe
                        </a>
                        <span>— February 26, 2020</span>
                    </div>
                    {/* Post Content */}
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-6">
                            Aliqum mullam blandit tempor sapien gravida donec ipsum, at
                            porta justo. Velna vitae auctor congue magna nihil impedit
                            ligula risus. Mauris donec ociis et magnis sapien etiam
                            sapien sem sagittis congue tempor gravida donec enim ipsum
                            porta justo integer at odio velna.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Sagittis congue augue egestas volutpat egestas magna
                            suscipit egestas magna ipsum vitae purus efficitur ipsum
                            primis in cubilia laoreet augue egestas luctus donec diam.
                        </p>
                        <h2 className="text-2xl text-midnight font-bold mt-8 mb-4">
                            Semper lacus cursus porta, feugiat primis
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Curabitur ac dapibus libero. Quisque eu tristique neque.
                            Phasellus blandit tristique justo ut aliquam. Aliquam vitae
                            molestie nunc. Quisque sapien justo, aliquet non molestie
                            sed, venenatis nec purus. Aliquam eget lacinia elit.
                            Vestibulum tincidunt tincidunt massa, et porttitor justo.
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                            <li>Tempor magna ipsum vitae purus primis pretium</li>
                            <li>An magnis nulla dolor sapien augue erat iaculis</li>
                            <li>Pretium ligula rutrum luctus blandit porta justo</li>
                            <li>
                                Feugiat a primis ultrice ligula risus auctor rhoncus purus
                                ipsum primis
                            </li>
                            <li>Sapien undo pretium purus ligula tempus ipsum</li>
                            <li>
                                Quaerat sodales sapien undo euismod purus and blandit
                                (Luctus Blandit Porta)
                            </li>
                        </ul>
                        <img
                            src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be"
                            alt="Australia Immigration"
                            className="w-full rounded-lg mb-6"
                        />
                        <h2 className="text-2xl font-bold mt-8 mb-4">
                            Vitae massa placerat vulputate
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Nullam non scelerisque lectus. In at mauris vel nisl
                            convallis porta at vitae dui. Nam lacus ligula, vulputate
                            molestie bibendum quis, aliquet elementum massa. Vestibulum
                            ut sagittis odio
                        </p>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
                        {['Consultations', 'Education', 'Embassy'].map((tag) => (
                            <a
                                key={tag}
                                href="#"
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-red-500 hover:text-white"
                            >
                                {tag}
                            </a>
                        ))}
                    </div>
                    {/* Share Buttons */}
                    <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                        <span className="text-gray-600">Share:</span>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Facebook size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Twitter size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-500">
                                <Linkedin size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>

    )
}
