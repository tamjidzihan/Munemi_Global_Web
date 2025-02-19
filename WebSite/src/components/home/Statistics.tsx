export function Statistics() {
    return (
        <section className="py-20 relative bg-black text-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523982440192-e61efc72c60c')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center mb-16">
                    Thousands Of People Choose Our Services
                </h2>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-yellow-500 mb-2">820 +</div>
                        <div className="text-sm">Happy Students</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-yellow-500 mb-2">148</div>
                        <div className="text-sm">University Partners</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-yellow-500 mb-2">80 +</div>
                        <div className="text-sm">Countries</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-yellow-500 mb-2">2487</div>
                        <div className="text-sm">Immigrations</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
