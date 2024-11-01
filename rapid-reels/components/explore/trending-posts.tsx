import { PostCard } from '@/components/content/post-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// Dummy data for trending posts
const trendingPosts = [
  {
    id: '1',
    user_id: 'user1',
    caption: 'Amazing sunset at the beach! 🌅',
    hashtags: ['#sunset', '#beach', '#nature'],
    media_url: 'https://picsum.photos/seed/1/800/600',
    media_type: 'image' as const,
    created_at: new Date().toISOString(),
    likes: 1500,
    comments: [
      {
        id: '1',
        user: { username: 'user2', avatarUrl: 'https://avatar.iran.liara.run/public/1' },
        content: 'Stunning view!',
        createdAt: new Date().toISOString(),
      },
    ],
    profiles: {
      id: 'user1',
      username: 'naturelover',
      avatar_url: 'https://picsum.photos/seed/user1/200',
    },
  },
  // Add more dummy trending posts...
]

export function TrendingPosts() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold">Trending</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Trending post cards */}
        {trendingPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={post.profiles}
            currentUser={{
              id: 'current-user',
              isFollowing: false,
              hasLiked: false,
            }}
          />
        ))}
      </div>
    </div>
  )
}
