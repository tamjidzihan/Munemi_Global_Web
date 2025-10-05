import React, { useEffect, useState, useRef } from 'react'
import { AlertCircle, Zap } from 'lucide-react'

interface NewsItem {
    id: string
    title: string
    isBreaking?: boolean
    category?: string
    link: string
}

const NewsTicker: React.FC = () => {
    const [news] = useState<NewsItem[]>([
        {
            id: '1',
            title: '🎓 Study Master of Professional Accounting at University of Waikato – New Zealand! 🇳🇿',
            isBreaking: true,
            category: 'Politics',
            link: 'https://munemiglobal.com/blog/study-master-of-professional-accounting-at-university-of-waikato-new-zealand'
        },
        {
            id: '2',
            title: 'National team advances to semifinals after dramatic victory',
            category: 'Sports',
            link: ''
        },
        {
            id: '3',
            title: 'Tech giant unveils revolutionary AI assistant',
            category: 'Technology',
            link: ''
        },
        {
            id: '4',
            title: 'Scientists discover potential breakthrough in cancer treatment',
            isBreaking: true,
            category: 'Health',
            link: ''
        },
        {
            id: '5',
            title: 'Major storm approaching coastal areas, evacuations ordered',
            isBreaking: true,
            category: 'Weather',
            link: ''
        },
        {
            id: '6',
            title: 'Stock market reaches all-time high amid economic recovery',
            category: 'Business',
            link: ''
        },
        {
            id: '7',
            title: 'Award-winning film director announces new project',
            category: 'Entertainment',
            link: ''
        },
    ])

    const [isPaused, setIsPaused] = useState(false)
    const tickerRef = useRef<HTMLDivElement>(null)

    // Reset animation when it completes or when component mounts
    useEffect(() => {
        const ticker = tickerRef.current
        if (!ticker) return

        const handleAnimationEnd = () => {
            ticker.classList.remove('news-ticker-animation')
            // Force a reflow
            void ticker.offsetWidth
            ticker.classList.add('news-ticker-animation')
        }

        ticker.addEventListener('animationend', handleAnimationEnd)

        return () => {
            ticker.removeEventListener('animationend', handleAnimationEnd)
        }
    }, [])

    return (
        <div
            className="bg-gray-900 text-white py-2 overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container mx-auto px-4 flex items-center">
                <div className="flex-shrink-0 flex items-center mr-4 pr-4 border-r border-gray-700">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    <span className="font-bold text-sm hidden md:inline-block">LATEST NEWS</span>
                </div>
                <div className="overflow-hidden flex-grow">
                    <div
                        ref={tickerRef}
                        className="whitespace-nowrap inline-block news-ticker-animation"
                        style={{
                            animationPlayState: isPaused ? 'paused' : 'running',
                            paddingRight: '50px',
                        }}
                    >
                        {news.map((item) => (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mr-12"
                            >
                                <span className="inline-flex items-center">
                                    {item.isBreaking && (
                                        <span className="inline-flex items-center mr-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                                            <Zap className="h-3 w-3 mr-0.5" />
                                            BREAKING
                                        </span>
                                    )}
                                    {item.category && (
                                        <span className="mr-2 text-blue-400 text-xs font-medium">
                                            {item.category}:
                                        </span>
                                    )}
                                    <span className="hover:text-blue-300">{item.title}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsTicker