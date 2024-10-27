import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { PostInteraction } from '@/components/social/post-interaction'

interface PostCardProps {
  post: {
    id: string
    user_id: string
    caption: string
    hashtags: string[]
    media_url: string
    media_type: 'image' | 'video'
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
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4 flex items-center space-x-2">
        <Image
          src={user.avatar_url || 'https://avatar.iran.liara.run/public/1'}
          alt={user.username}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-semibold">{user.username}</span>
      </div>
      {post.media_type === 'image' ? (
        <Image
          src={post.media_url}
          alt={post.caption}
          width={500}
          height={500}
          layout="responsive"
        />
      ) : (
        <video src={post.media_url} controls className="w-full" />
      )}
      <div className="p-4">
        <p>{post.caption}</p>
        <div className="mt-2">
          {post.hashtags.map((tag, index) => (
            <span key={index} className="text-blue-500 mr-2">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-2">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </p>
        <PostInteraction
          postId={post.id}
          author={{
            id: user.id,
            username: user.username,
            avatarUrl: user.avatar_url
          }}
          likes={post.likes}
          comments={post.comments}
          isLiked={currentUser.hasLiked}
          isFollowing={currentUser.isFollowing}
        />
      </div>
    </div>
  )
}
