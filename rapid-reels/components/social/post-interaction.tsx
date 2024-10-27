"use client"

import { useState } from 'react'
import { Heart, MessageCircle, Share2, UserPlus, UserMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

interface Comment {
  id: string
  user: {
    username: string
    avatarUrl: string
  }
  content: string
  createdAt: string
}

interface PostInteractionProps {
  postId: string
  author: {
    id: string
    username: string
    avatarUrl: string
  }
  likes: number
  comments: Comment[]
  isLiked: boolean
  isFollowing: boolean
}

export function PostInteraction({ postId, author, likes, comments, isLiked, isFollowing }: PostInteractionProps) {
  const [localLikes, setLocalLikes] = useState(likes)
  const [localIsLiked, setLocalIsLiked] = useState(isLiked)
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing)
  const [localComments, setLocalComments] = useState(comments)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    // TODO: Implement API call to like/unlike post
    setLocalIsLiked(!localIsLiked)
    setLocalLikes(localIsLiked ? localLikes - 1 : localLikes + 1)
  }

  const handleFollow = () => {
    // TODO: Implement API call to follow/unfollow user
    setLocalIsFollowing(!localIsFollowing)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      // TODO: Implement API call to add comment
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: {
          username: 'Current User', // Replace with actual current user data
          avatarUrl: 'https://avatar.iran.liara.run/public/41'
        },
        content: newComment,
        createdAt: new Date().toISOString()
      }
      setLocalComments([...localComments, newCommentObj])
      setNewComment('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <Heart className={`mr-1 h-5 w-5 ${localIsLiked ? 'fill-red-500 text-red-500' : ''}`} />
            {localLikes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-1 h-5 w-5" />
            {localComments.length}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-1 h-5 w-5" />
            Share
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleFollow}>
          {localIsFollowing ? (
            <>
              <UserMinus className="mr-1 h-5 w-5" /> Unfollow
            </>
          ) : (
            <>
              <UserPlus className="mr-1 h-5 w-5" /> Follow
            </>
          )}
        </Button>
      </div>
      <div className="space-y-2">
        {localComments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.user.avatarUrl} alt={comment.user.username} />
              <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{comment.user.username}</p>
              <p className="text-sm">{comment.content}</p>
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
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  )
}
