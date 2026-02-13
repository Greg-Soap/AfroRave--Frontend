import React, { createContext, useContext, useEffect, useState } from 'react'

interface WishlistContextType {
    bookmarkedIds: Set<string>
    toggleBookmark: (id: string) => void
    isBookmarked: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('vendor_wishlist')
            if (saved) {
                try {
                    return new Set(JSON.parse(saved))
                } catch (e) {
                    console.error('Failed to parse wishlist from localStorage', e)
                }
            }
        }
        return new Set()
    })

    // Persist to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('vendor_wishlist', JSON.stringify(Array.from(bookmarkedIds)))
        }
    }, [bookmarkedIds])

    const toggleBookmark = (id: string) => {
        setBookmarkedIds(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const isBookmarked = (id: string) => {
        return bookmarkedIds.has(id)
    }

    return (
        <WishlistContext.Provider value={{ bookmarkedIds, toggleBookmark, isBookmarked }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}
