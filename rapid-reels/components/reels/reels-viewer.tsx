"use client"

import { useState, useRef, useEffect } from 'react'
import { ReelCard } from './reel-card'

interface Reel {
  id: string
  user: {
    id: string
    username: string
    avatar_url: string
  }
  video_url: string
  caption: string
  likes: number
  comments: Array<{
    id: string
    user: {
      username: string
      avatarUrl: string
    }
    content: string
    createdAt: string
  }>
  music: string
  effects: string[]
  created_at: string
}

interface ReelsViewerProps {
  reels: Reel[]
}

export function ReelsViewer({ reels }: ReelsViewerProps) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight
        const scrollPosition = containerRef.current.scrollTop
        const newIndex = Math.round(scrollPosition / containerHeight)
        if (newIndex !== currentReelIndex) {
          setCurrentReelIndex(newIndex)
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [currentReelIndex])

  return (
    <div 
      ref={containerRef}
      className="relative h-[100dvh] md:h-[calc(100vh-6rem)] overflow-y-auto snap-y snap-mandatory rounded-3xl md:rounded-xl scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      {reels.map((reel, index) => (
        <div 
          key={reel.id}
          className="h-[85dvh] md:h-full snap-start snap-always"
        >
          <ReelCard 
            reel={reel} 
            isVisible={index === currentReelIndex}
          />
        </div>
      ))}
    </div>
  )
}

const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`
