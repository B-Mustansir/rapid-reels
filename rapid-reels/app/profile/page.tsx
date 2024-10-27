import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ProfileForm } from '@/components/profile/profile-form'
import { ReclaimVerification } from '@/components/auth/reclaim-verification'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
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
    .eq('id', session.user.id)
    .single()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfileForm initialData={profile || null} />
      <ReclaimVerification />
    </div>
  )
}
