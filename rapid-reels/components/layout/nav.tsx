"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Film, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export function Nav() {
  const pathname = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Initial profile fetch
    getProfile()

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getProfile()
      } else {
        setUsername(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function getProfile() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()
      
      if (profile) setUsername(profile.username)
    }
  }

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Search },
    { href: '/reels', label: 'Reels', icon: Film },
    { href: username ? `/users/${username}` : '/auth', label: 'Profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg md:top-0 md:bottom-auto">
      <div className="container flex h-14 items-center justify-around md:justify-between">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center md:flex-row md:gap-2 px-3 py-1.5 text-sm transition-colors hover:text-foreground",
              pathname === href
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs md:text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
