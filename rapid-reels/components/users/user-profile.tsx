"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UserPlus, UserMinus, Edit2, Shield } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useToast } from '@/hooks/use-toast'

interface UserProfileProps {
  profile: {
    id: string
    username: string
    full_name: string
    bio: string
    avatar_url: string | null
    followers_count: number
    following_count: number
  }
  isCurrentUser: boolean
  trustScore: {
    verification_level: 'none' | 'basic' | 'advanced'
    total_score: number
  }
}

export function UserProfile({ profile, isCurrentUser, trustScore }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? 
        `You unfollowed ${profile.username}` : 
        `You are now following ${profile.username}`,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getVerificationBadge = () => {
    switch (trustScore.verification_level) {
      case 'advanced':
        return <span className="text-green-500 text-sm flex items-center">
          <Shield className="h-4 w-4 mr-1" /> Fully Verified
        </span>
      case 'basic':
        return <span className="text-yellow-500 text-sm flex items-center">
          <Shield className="h-4 w-4 mr-1" /> Partially Verified
        </span>
      default:
        return <span className="text-gray-500 text-sm flex items-center">
          <Shield className="h-4 w-4 mr-1" /> Not Verified
        </span>
    }
  }

  if (isEditing && isCurrentUser) {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={formData.avatar_url || 'https://avatar.iran.liara.run/public/1'} />
            <AvatarFallback>{formData.username[0]}</AvatarFallback>
          </Avatar>
          <Input
            name="avatar_url"
            placeholder="Avatar URL"
            value={formData.avatar_url || ''}
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
          />
        </div>
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <Input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />
        <Textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url || 'https://avatar.iran.liara.run/public/1'} alt={profile.username} />
          <AvatarFallback>{profile.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                {getVerificationBadge()}
              </div>
              <p className="text-gray-600">{profile.full_name}</p>
            </div>
            {isCurrentUser ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={handleFollow}
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Follow
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="flex space-x-6 my-4">
            <div>
              <span className="font-semibold">{profile.followers_count}</span>{" "}
              <span className="text-gray-600">followers</span>
            </div>
            <div>
              <span className="font-semibold">{profile.following_count}</span>{" "}
              <span className="text-gray-600">following</span>
            </div>
            <div>
              <span className="font-semibold">{trustScore.total_score}</span>{" "}
              <span className="text-gray-600">trust score</span>
            </div>
          </div>
          <p className="text-gray-700">{profile.bio}</p>
        </div>
      </div>
    </div>
  )
}
