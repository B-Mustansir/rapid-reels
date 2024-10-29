"use client"

import { useRef, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ReelInteractions } from './reel-interactions'
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReelCardProps {
  reel: {
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
  }
  isVisible: boolean
}

export function ReelCard({ reel, isVisible }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => console.log('Playback failed:', error))
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [isVisible])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={reel.video_url}
        className="h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlayPause}
      />
      
      {/* Play/Pause Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlayPause}
      >
        {!isPlaying && (
          <div className="bg-black/30 rounded-full p-4 transition-opacity opacity-0 hover:opacity-100">
            <Play className="h-12 w-12 text-white" />
          </div>
        )}
      </div>

      {/* Volume Control */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </Button>

      {/* User Info and Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={reel.user.avatar_url} alt={reel.user.username} />
            <AvatarFallback>{reel.user.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">{reel.user.username}</p>
            <p className="text-sm text-gray-300">{reel.caption}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-300">
            <span className="text-white">🎵</span> {reel.music}
          </p>
        </div>
      </div>
      <ReelInteractions reel={reel} />
    </div>
  )
}
