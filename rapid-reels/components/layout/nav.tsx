"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Film, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Dock, DockIcon } from '@/components/ui/dock'
import { motion, useMotionValue } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"

export function Nav() {
  const pathname = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const mouseX = useMotionValue(Infinity)
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
    <div className="fixed bottom-6 left-0 right-0 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <TooltipProvider>
          <Dock 
            className="bg-background/80 border-t md:border-t-0 md:border-b"
            magnification={50}
            distance={100}
          >
            {links.map(({ href, label, icon: Icon }) => (
              <DockIcon
                key={label}
                mouseX={mouseX}
                className="bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      aria-label={label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full",
                        pathname === href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
