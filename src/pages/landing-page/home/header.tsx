import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function LandingPageHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src="/assets/logo.png"
                        alt="AfroRave"
                        className="h-8 md:h-10 w-auto"
                    />
                </Link>

                {/* Countdown Timer */}
                <CountdownTimer />
            </div>
        </header>
    )
}

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        // Target date: February 15, 2026 at 00:00:00 Nigerian Time (WAT, UTC+1)
        const targetDate = new Date('2026-02-15T00:00:00+01:00').getTime()

        function updateCountdown() {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ days, hours, minutes, seconds })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center gap-1 text-white font-mono text-sm md:text-base">
            <span>{String(timeLeft.days).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="hidden sm:inline">:</span>
            <span className="hidden sm:inline">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
    )
}
