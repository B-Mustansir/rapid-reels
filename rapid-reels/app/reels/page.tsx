import { ReelsViewer } from '@/components/reels/reels-viewer'
import { ReelsCreator } from '@/components/reels/reels-creator'

// Dummy data for reels
const dummyReels = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'dance_star',
      avatar_url: 'https://avatar.iran.liara.run/public/1',
    },
    video_url: 'https://res.cloudinary.com/dvhqjxen3/video/upload/v1730054311/samples/reels/QuickStyle-Kala-Chashma.mp4',
    caption: '🎵 New dance routine! #dance #viral',
    likes: 1200,
    comments: [
      {
        id: 'c1',
        user: { username: 'fan1', avatarUrl: 'https://avatar.iran.liara.run/public/2' },
        content: 'Amazing moves! 🔥',
        createdAt: new Date().toISOString(),
      },
    ],
    music: 'Kala Chashma - QuickStyle',
    effects: ['color_boost', 'slow_motion'],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user: {
      id: 'user2',
      username: 'food_lover',
      avatar_url: 'https://avatar.iran.liara.run/public/3',
    },
    video_url: 'https://res.cloudinary.com/dvhqjxen3/video/upload/v1730055545/samples/reels/breakfast-potatoes.mp4',
    caption: '🍳 Easy breakfast recipe #cooking #foodie',
    likes: 850,
    comments: [],
    music: 'Cooking Time - Kitchen Beats',
    effects: ['vivid'],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    user: {
      id: 'user3',
      username: 'travel_bug',
      avatar_url: 'https://avatar.iran.liara.run/public/60',
    },
    video_url: 'https://res.cloudinary.com/dvhqjxen3/video/upload/v1730055544/samples/reels/hidden-gems-bali.mp4',
    caption: '✈️ Exploring hidden gems in Bali #travel #wanderlust',
    likes: 2300,
    comments: [],
    music: 'Paradise - Travel Tunes',
    effects: ['cinematic'],
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    user: {
      id: 'user4',
      username: 'fitness_guru',
      avatar_url: 'https://avatar.iran.liara.run/public/72',
    },
    video_url: 'https://res.cloudinary.com/dvhqjxen3/video/upload/v1730055536/samples/reels/abs-workout.mp4',
    caption: '💪 5-minute ab workout #fitness #workout',
    likes: 1500,
    comments: [],
    music: 'Workout Mix - Gym Beats',
    effects: ['energy'],
    created_at: new Date().toISOString(),
  },
]

export default function ReelsPage() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex-1">
          <ReelsViewer reels={dummyReels} />
        </div>
        <div className="w-full lg:w-72">
          <ReelsCreator />
        </div>
      </div>
    </div>
  )
}