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
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Suggested Users</h2>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                  {user.bio}
                </p>
              </div>
            </div>
            <Button
              variant={user.isFollowing ? "outline" : "default"}
              size="sm"
              onClick={() => handleFollow(user.id)}
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
