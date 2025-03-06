import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"


interface HeroProps {
    bgImage: string
    heroName: string
}

const Hero = ({ bgImage, heroName }: HeroProps) => {

    useEffect(() => {
        document.title = `${heroName} | Munemi Global `
    })

    return (
        <section className=" min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] flex items-center justify-center text-center text-white overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="z-10 max-w-4xl mx-auto px-6 md:px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="[text-shadow:_0_8px_8px_rgb(99_102_241_/_0.8)] text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">{heroName.toLocaleUpperCase()}</h1>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Hero