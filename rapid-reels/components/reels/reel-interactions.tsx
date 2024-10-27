"use client"

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Comment {
  id: string
  user: {
    username: string
    avatarUrl: string
  }
  content: string
  createdAt: string
}

interface ReelInteractionsProps {
  reel: {
    id: string
    user: {
      id: string
      username: string
      avatar_url: string
    }
    likes: number
    comments: Comment[]
    music: string
  }
}

export function ReelInteractions({ reel }: ReelInteractionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(reel.likes)
  const [comments, setComments] = useState(reel.comments)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    // TODO: Implement API call to like/unlike reel
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // TODO: Implement API call to add comment
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        username: 'Current User',
        avatarUrl: 'https://avatar.iran.liara.run/public/41'
      },
      content: newComment,
      createdAt: new Date().toISOString()
    }

    setComments([...comments, comment])
    setNewComment('')
  }

  return (
    <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/20 hover:bg-black/40"
        onClick={handleLike}
      >
        <Heart className={cn(
          "h-6 w-6 text-white",
          isLiked && "fill-red-500 text-red-500"
        )} />
        <span className="text-xs text-white mt-1">{likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/20 hover:bg-black/40"
        onClick={() => setShowComments(!showComments)}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="text-xs text-white mt-1">{comments.length}</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/20 hover:bg-black/40"
      >
        <Share2 className="h-6 w-6 text-white" />
      </Button>

      <div className="flex items-center space-x-2">
        <Music2 className="h-6 w-6 text-white" />
      </div>

      {showComments && (
        <div className="absolute right-16 bottom-0 w-80 bg-black/80 rounded-lg p-4">
          <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.avatarUrl} alt={comment.user.username} />
                  <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">{comment.user.username}</p>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleAddComment} className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-transparent text-white placeholder-gray-400 border-gray-600"
            />
            <Button type="submit" variant="secondary" size="sm">
              Post
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
