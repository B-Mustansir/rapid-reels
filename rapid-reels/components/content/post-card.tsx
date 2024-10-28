"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PostCarousel } from "./post-carousel"

interface PostCardProps {
  post: {
    id: string
    caption: string
    media_url?: string // Single URL from database
    media_urls?: string[] // Array of URLs for dummy data
    media_type: 'image' | 'video' | 'carousel'
    created_at: string
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
  }
  user: {
    id: string
    username: string
    avatar_url: string
  }
  currentUser: {
    id: string
    isFollowing: boolean
    hasLiked: boolean
  }
}

export function PostCard({ post, user, currentUser }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(currentUser.hasLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  // Handle both single media_url and media_urls array
  const mediaUrls = post.media_urls || (post.media_url ? [post.media_url] : [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar_url} alt={user.username} />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.username}</p>
          </div>
        </div>
      </div>

      {/* Media Content */}
      <div className="relative">
        {mediaUrls.length > 0 && (
          post.media_type === 'carousel' && mediaUrls.length > 1 ? (
            <PostCarousel media_urls={mediaUrls} />
          ) : post.media_type === 'video' ? (
            <video
              src={mediaUrls[0]}
              className="w-full"
              controls
            />
          ) : (
            <div className="relative aspect-square">
              <Image
                src={mediaUrls[0]}
                alt="Post content"
                fill
                className="object-cover"
              />
            </div>
          )
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-6 w-6" />
          </Button>
        </div>

        <div>
          <p className="font-semibold">{likesCount} likes</p>
          <p>
            <span className="font-semibold">{user.username}</span>{" "}
            {post.caption}
          </p>
        </div>

        {showComments && (
          <div className="space-y-2">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={comment.user.avatarUrl} />
                  <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold">{comment.user.username}</span>{" "}
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
