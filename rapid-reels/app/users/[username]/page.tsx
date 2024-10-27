import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { UserProfile } from '@/components/users/user-profile'
import { TrustScore } from '@/components/users/trust-score'

// Dummy trust score data
const dummyTrustScore = {
  proof_of_personhood: true,
  engagement_score: 85,
  verification_level: 'advanced' as const,
  total_score: 92,
  verifications: [
    'Email Verified',
    'Phone Number Verified',
    'GitHub Account Linked',
    'LinkedIn Profile Verified',
    'Twitter Account Verified',
    'Google Account Linked'
  ],
  badges: [
    'Trusted Creator',
    'Active Contributor',
    'Community Leader'
  ],
  verification_history: [
    {
      type: 'Email',
      date: '2024-01-15',
      status: 'Verified'
    },
    {
      type: 'Phone',
      date: '2024-01-16',
      status: 'Verified'
    },
    {
      type: 'GitHub',
      date: '2024-01-20',
      status: 'Verified'
    }
  ]
}

export default async function UserProfilePage({
  params: { username }
}: {
  params: { username: string }
}) {
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) {
    notFound()
  }

  // Check if this is the current user's profile
  const isCurrentUser = session.user.id === profile.id

  // Use dummy trust score data for now
  const trustScore = {
    ...dummyTrustScore,
    // Randomize some values for demo purposes
    engagement_score: Math.floor(Math.random() * 100),
    total_score: Math.floor(Math.random() * 100),
    verification_level: ['none', 'basic', 'advanced'][Math.floor(Math.random() * 3)] as 'none' | 'basic' | 'advanced'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile 
        profile={profile} 
        isCurrentUser={isCurrentUser}
        trustScore={trustScore}
      />
      <TrustScore 
        score={trustScore} 
        userId={profile.id} 
        isCurrentUser={isCurrentUser}
      />
    </div>
  )
}
