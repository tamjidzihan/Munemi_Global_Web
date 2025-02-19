export function ConsultationSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                        alt="Consultation"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-red-500 border-b-8 border-b-transparent ml-1"></div>
                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-gray-600 mb-2">WILLIAM SHAKESPEARE</p>
                    <h2 className="text-3xl font-bold mb-8">
                        Consultations for prospective students
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <span className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></span>
                            <p className="text-gray-600">
                                An magnus nulla dolor sapien augue erat iaculis purus tempor
                                magna ipsum vitae purus primis pretium ligula rutrum luctus
                                blandit porta justo integer. Feugiat a primis ultrice ligula
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <span className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></span>
                            <p className="text-gray-600">
                                Nemo ipsam egestas volute turpis dolores and aliquam quaerat
                                sodales sapien undo pretium purus ligula tempus ipsum undo
                                auctor a mauris lectus ipsum blandit
                            </p>
                        </li>
                        <li className="flex gap-4">
                            <span className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></span>
                            <p className="text-gray-600">
                                Quaerat sodales sapien undo euismod purus and blandit laoreet
                                augue an augue egestas. Augue iaculis purus and augue tempor
                                congue magna egestas magna ligula
                            </p>
                        </li>
                    </ul>
                    <button className="mt-8 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
                        GET STARTED
                    </button>
                </div>
            </div>
        </section>
    );
}
