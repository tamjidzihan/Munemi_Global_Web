import careerImage from '../../assets/career.jpg'

const CareerHero = () => {
    return (
        <section className="relative h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${careerImage})` }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
                <p className="text-xl mb-8">
                    Be part of a dynamic team helping people achieve their immigration
                    dreams
                </p>
                <a href='#positions'>
                    <button className="bg-red-500 text-white cursor-pointer px-8 py-3 rounded-xl hover:bg-red-600  hover:scale-105 transition-transform">
                        View Open Positions
                    </button>
                </a>
            </div>
        </section>
    )
}

export default CareerHero