import { PostCard } from '@/components/content/post-card'

// Dummy data for recommended content
const recommendedPosts = [
  {
    id: '3',
    user_id: 'user3',
    caption: 'Trying out this new recipe! 🍝',
    hashtags: ['#cooking', '#foodie', '#homemade'],
    media_url: 'https://picsum.photos/seed/3/800/600',
    media_type: 'image' as const,
    created_at: new Date().toISOString(),
    likes: 850,
    comments: [
      {
        id: '1',
        user: { username: 'user4', avatarUrl: 'https://avatar.iran.liara.run/public/22' },
        content: 'Looks delicious!',
        createdAt: new Date().toISOString(),
      },
    ],
    profiles: {
      id: 'user3',
      username: 'chef_master',
      avatar_url: 'https://picsum.photos/seed/user3/200',
    },
  },
  // Add more dummy recommended posts...
]

export function ContentRecommendations() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold">Recommended for You</h2>
      <div className="grid grid-cols-1 gap-4">
        {recommendedPosts.map((post) => (
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
