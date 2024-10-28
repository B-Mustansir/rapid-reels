"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative w-full">
      <Input 
        placeholder="Search..."
        className="w-full h-10 sm:h-12 pl-10 pr-4 rounded-lg"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  )
}
