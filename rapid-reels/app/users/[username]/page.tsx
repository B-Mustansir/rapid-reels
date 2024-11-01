import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { UserProfile } from '@/components/users/user-profile'
import { TrustScore } from '@/components/users/trust-score'
import { getTrustScore } from '@/lib/utils/trust-score'

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
    // 'LinkedIn Profile Verified',
    // 'Twitter Account Verified',
    // 'Google Account Linked'
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

  // Fetch the profile data for the requested username
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) {
    notFound()
  }

  // Check if this is the current user's profile
  const isCurrentUser = session.user.id === profile.id

  // Use dummy trust score data for now
  const trustScore = getTrustScore(profile.id)

  return (
    <div className="space-y-6">
      <UserProfile 
        profile={profile} 
        isCurrentUser={isCurrentUser}
        trustScore={trustScore}
      />
      {isCurrentUser && <TrustScore score={trustScore} userId={profile.id} />}
    </div>
  )
}
