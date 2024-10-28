import React from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { CloudinaryUpload } from './components/cloudinary-upload';
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ContentCreationForm } from '@/components/content/content-creation-form'
import { PostCard } from '@/components/content/post-card'

const ReclaimDemo = dynamic(() => import('./components/reclaim-demo'), { ssr: false });

// Dummy data for posts
const dummyPosts = [
  {
    id: 'p1',
    user_id: 'u1',
    caption: '🌟 Just wrapped up an amazing photoshoot in downtown NYC! Swipe to see the magic ✨ #StreetPhotography #NYCLife',
    media_urls: [
      'https://cdn.pixabay.com/photo/2020/05/08/15/39/new-york-5146247_1280.jpg',
      'https://cdn.pixabay.com/photo/2020/06/16/01/40/buildings-5303864_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/09/07/04/56/new-york-3659946_1280.jpg',
      'https://res.cloudinary.com/dvhqjxen3/image/upload/v1730084684/samples/reels/gsulgq30spazaqaesl0g.jpg'
    ],
    media_type: 'carousel',
    created_at: '2024-03-20T15:30:00Z',
    hashtags: ['photography', 'nyc', 'streetstyle'],
    profiles: {
      id: 'u1',
      username: 'blake.captures',
      avatar_url: 'https://avatar.iran.liara.run/public/boy?username=blake'
    }
  },
  {
    id: 'p2',
    user_id: 'u2',
    caption: '🎵 New dance reel alert! 💃 Been practicing this routine for weeks - what do you think? 🎶\n\n#DanceLife #Choreography',
    media_urls: ['https://res.cloudinary.com/dvhqjxen3/video/upload/v1730086070/samples/reels/utjfgxswpgsn3dxffw2b.mp4'],
    media_type: 'video',
    created_at: '2024-03-20T14:25:00Z',
    hashtags: ['dance', 'reels', 'dualipa'],
    profiles: {
      id: 'u2',
      username: 'dance.with.sarah',
      avatar_url: 'https://avatar.iran.liara.run/public/girl?username=sarah'
    }
  },
  {
    id: 'p3',
    user_id: 'u3',
    caption: '🍜 Secret family recipe alert! My grandmother\'s legendary ramen recipe, passed down through generations. The key is in the 12-hour broth! \n\nFull recipe on my blog (link in bio) 👩‍🍳\n\n#FoodBlogger #Ramen #CookingWithLove',
    media_urls: [
      'https://cdn.pixabay.com/photo/2024/06/18/07/13/ramen-8837174_960_720.png',
      'https://cdn.pixabay.com/photo/2022/05/10/18/50/ramen-7187810_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/07/25/17/35/ramen-3561894_960_720.jpg'
    ],
    media_type: 'carousel',
    created_at: '2024-03-20T13:15:00Z',
    hashtags: ['cooking', 'foodie', 'ramen'],
    profiles: {
      id: 'u3',
      username: 'chef.mike',
      avatar_url: 'https://avatar.iran.liara.run/public/boy?username=mike'
    }
  },
  {
    id: 'p4',
    user_id: 'u4',
    caption: '🎨 Latest mural complete! This one\'s all about bringing hope and color to our community. Took 2 weeks but every minute was worth it! Special thanks to @artspace for the wall 🙏\n\n#StreetArt #Mural #ArtistsOfInstagram',
    media_urls: ['https://cdn.pixabay.com/photo/2023/07/28/15/14/wall-8155414_960_720.jpg'],
    media_type: 'image',
    created_at: '2024-03-20T12:00:00Z',
    hashtags: ['art', 'mural', 'streetart'],
    profiles: {
      id: 'u4',
      username: 'art.by.alex',
      avatar_url: 'https://avatar.iran.liara.run/public/boy?username=alex'
    }
  },
  {
    id: 'p5',
    user_id: 'u5',
    caption: '🌱 Spring garden update! These tomatoes are thriving and the herbs are going crazy! Who else is getting their garden ready for summer? 🍅\n\n#GardenLife #GrowYourOwn #Sustainable',
    media_urls: [
      'https://cdn.pixabay.com/photo/2020/07/17/16/58/tomatoes-5414735_960_720.jpg',
      'https://cdn.pixabay.com/photo/2021/09/10/21/18/tomatoes-6614242_960_720.jpg'
    ],
    media_type: 'carousel',
    created_at: '2024-03-20T11:30:00Z',
    hashtags: ['gardening', 'sustainable', 'organic'],
    profiles: {
      id: 'u5',
      username: 'green.thumb.lisa',
      avatar_url: 'https://avatar.iran.liara.run/public/girl?username=lisa'
    }
  }
]

export default async function HomePage() {
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

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (id, username, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error fetching posts:', error)
    return <div>Error loading posts</div>
  }

  // Combine real posts with dummy data
  const postsWithDummyData = [
    ...(posts?.map(post => ({
      ...post,
      likes: Math.floor(Math.random() * 100),
      comments: [
        {
          id: '1',
          user: { username: 'art.lover', avatarUrl: 'https://avatar.iran.liara.run/public/78' },
          content: 'This is incredible! 🔥',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          user: { username: 'creative.soul', avatarUrl: 'https://avatar.iran.liara.run/public/45' },
          content: 'Love the composition! 📸',
          createdAt: new Date().toISOString()
        }
      ],
    })) || []),
    ...dummyPosts.map(post => ({
      ...post,
      likes: Math.floor(Math.random() * 1000) + 100,
      comments: [
        {
          id: `c${Math.random()}`,
          user: { username: 'wanderlust.kate', avatarUrl: 'https://avatar.iran.liara.run/public/32' },
          content: 'This is absolutely stunning! 😍',
          createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
        },
        {
          id: `c${Math.random()}`,
          user: { username: 'photo.enthusiast', avatarUrl: 'https://avatar.iran.liara.run/public/91' },
          content: 'The lighting is perfect! ✨',
          createdAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
        }
      ]
    }))
  ]

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Share Your Moment</h1>
        <ContentCreationForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Your Feed</h2>
        <div className="space-y-6">
          {postsWithDummyData?.map((post) => (
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
      </section>
    </div>
  )
}
