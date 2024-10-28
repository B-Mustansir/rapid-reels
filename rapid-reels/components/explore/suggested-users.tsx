"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface SuggestedUser {
  id: string
  username: string
  avatarUrl: string
  bio: string
  isFollowing: boolean
}

// Dummy data for suggested users
const dummySuggestedUsers: SuggestedUser[] = [
  {
    id: '1',
    username: 'travel_enthusiast',
    avatarUrl: 'https://picsum.photos/seed/user1/200',
    bio: 'Exploring the world one city at a time ✈️',
    isFollowing: false,
  },
  {
    id: '2',
    username: 'foodie_adventures',
    avatarUrl: 'https://picsum.photos/seed/user2/200',
    bio: 'Food blogger | Recipe creator 🍳',
    isFollowing: false,
  },
  // Add more dummy users...
]

export function SuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState(dummySuggestedUsers)

  const handleFollow = (userId: string) => {
    setSuggestedUsers(users =>
      users.map(user =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold">Suggested Users</h2>
      
      <div className="space-y-3">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.bio}
              </p>
            </div>
            
            <Button variant="outline" size="sm" onClick={() => handleFollow(user.id)}>
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
