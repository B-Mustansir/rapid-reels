// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ContentCreationForm } from '@/components/content/content-creation-form'
import { PostCard } from '@/components/content/post-card'
import { redirect } from 'next/navigation'

// Dummy data for social interactions
const dummyComments = [
  {
    id: '1',
    user: { username: 'user1', avatarUrl: 'https://avatar.iran.liara.run/public/78' },
    content: 'Great post!',
    createdAt: '2023-04-01T12:00:00Z'
  },
  {
    id: '2',
    user: { username: 'user2', avatarUrl: 'https://avatar.iran.liara.run/public/22' },
    content: 'Love this!',
    createdAt: '2023-04-01T13:00:00Z'
  }
]

interface Post {
  id: string
  user_id: string
  caption: string
  hashtags: string[]
  media_url: string
  media_type: 'image' | 'video'
  created_at: string
  profiles: {
    id: string
    username: string
    avatar_url: string
  }
}

export default async function ContentPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  // Add debugging logs
  console.log('Session user ID:', session.user.id)

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (id, username, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Add debugging logs
  console.log('Posts data:', posts)
  console.log('Fetch error:', error)

  if (error) {
    console.error('Error fetching posts:', error)
    return <div>Error loading posts</div>
  }

  // Add null check for posts
  if (!posts || posts.length === 0) {
    return <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <ContentCreationForm />
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Posts</h2>
      <p className="text-gray-500">No posts found. Create your first post!</p>
    </div>
  }

  const postsWithDummyData = (posts as Post[]).map(post => ({
    ...post,
    likes: Math.floor(Math.random() * 100),
    comments: dummyComments,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <ContentCreationForm />
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Posts</h2>
      <div className="space-y-8">
        {postsWithDummyData.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={post.profiles}
            currentUser={{
              id: session.user.id,
              isFollowing: Math.random() < 0.5,
              hasLiked: Math.random() < 0.5
            }}
          />
        ))}
      </div>
    </div>
  )
}
