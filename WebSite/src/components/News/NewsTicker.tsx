import React, { useEffect, useState, useRef } from 'react'
import { AlertCircle, Zap } from 'lucide-react'
import useNewsHeadlines from '../../hooks/useNewsHeadlines'

const NewsTicker: React.FC = () => {
    const {
        loading,
        error,
        getActiveHeadlines,
        refreshHeadlines
    } = useNewsHeadlines()

    const [isPaused, setIsPaused] = useState(false)
    const tickerRef = useRef<HTMLDivElement>(null)

    // Get active headlines for the ticker
    const activeHeadlines = getActiveHeadlines()

    // Optional: Only show breaking news in the ticker
    // const breakingHeadlines = getBreakingNews()

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

    // Refresh headlines periodically (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            refreshHeadlines()
        }, 30000) // Refresh every 30 seconds

        return () => clearInterval(interval)
    }, [refreshHeadlines])

    // Show loading state
    if (loading && activeHeadlines.length === 0) {
        return (
            <div className="bg-gray-900 text-white py-2 overflow-hidden relative">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="flex-shrink-0 flex items-center mr-4 pr-4 border-r border-gray-700">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span className="font-bold text-sm hidden md:inline-block">LATEST NEWS</span>
                    </div>
                    <div className="text-gray-400 text-sm">Loading news headlines...</div>
                </div>
            </div>
        )
    }

    // Show error state
    if (error && activeHeadlines.length === 0) {
        return (
            <div className="bg-gray-900 text-white py-2 overflow-hidden relative">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="flex-shrink-0 flex items-center mr-4 pr-4 border-r border-gray-700">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span className="font-bold text-sm hidden md:inline-block">LATEST NEWS</span>
                    </div>
                    <div className="text-red-400 text-sm">Failed to load news</div>
                </div>
            </div>
        )
    }

    // Show empty state
    if (activeHeadlines.length === 0) {
        return (
            <div className="bg-gray-900 text-white py-2 overflow-hidden relative">
                <div className="container mx-auto px-4 flex items-center">
                    <div className="flex-shrink-0 flex items-center mr-4 pr-4 border-r border-gray-700">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span className="font-bold text-sm hidden md:inline-block">LATEST NEWS</span>
                    </div>
                    <div className="text-gray-400 text-sm">No news headlines available</div>
                </div>
            </div>
        )
    }

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
                        {activeHeadlines.map((item) => (
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