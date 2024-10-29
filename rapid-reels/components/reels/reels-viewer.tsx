"use client"

import { useState, useRef, useEffect } from 'react'
import { ReelCard } from './reel-card'
import { ReelControls } from './reel-controls'

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
      className="relative h-[100dvh] md:h-[calc(100vh-6rem)] overflow-y-auto snap-y snap-mandatory rounded-3xl"
      style={{ scrollBehavior: 'smooth' }}
    >
      {reels.map((reel, index) => (
        <div 
          key={reel.id}
          className="h-[87dvh] md:h-full snap-start snap-always"
        >
          <ReelCard 
            reel={reel} 
            isVisible={index === currentReelIndex}
          />
        </div>
      ))}
      <ReelControls
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentReelIndex < reels.length - 1}
        hasPrevious={currentReelIndex > 0}
      />
    </div>
  )
}
