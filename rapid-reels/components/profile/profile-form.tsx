"use client"

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { ProfileData } from '@/types/profile'

interface ProfileFormProps {
  initialData: ProfileData | null
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<Partial<ProfileData>>(initialData || {
    username: '',
    full_name: '',
    bio: '',
    avatar_url: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...formData,
          id: initialData?.id,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="username"
        placeholder="Username"
        value={formData.username || ''}
        onChange={handleChange}
      />
      <Input
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name || ''}
        onChange={handleChange}
      />
      <Textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio || ''}
        onChange={handleChange}
      />
      <Input
        name="avatar_url"
        placeholder="Avatar URL"
        value={formData.avatar_url || ''}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  )
}
