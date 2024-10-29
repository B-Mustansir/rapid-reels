"use client"

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { CldUploadWidget } from 'next-cloudinary'

interface UploadResult {
  info: {
    secure_url: string
    resource_type: 'image' | 'video'
  }
}

export function ContentCreationForm() {
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleMediaUpload = (result: UploadResult) => {
    setMediaUrl(result.info.secure_url)
    setMediaType(result.info.resource_type)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')
      const { error } = await supabase.from('posts').insert({
        user_id: user.id,
        caption,
        hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
        media_url: mediaUrl,
        media_type: mediaType,
      })

      if (error) throw error

      toast({
        title: "Post created",
        description: "Your post has been successfully created.",
      })

      // Reset form
      setCaption('')
      setHashtags('')
      setMediaUrl('')
      setMediaType(null)
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
      <Textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />
      <Input
        placeholder="Add hashtags (e.g., #fun #travel)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={(result: any) => handleMediaUpload(result)}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Media
          </Button>
        )}
      </CldUploadWidget>
      {mediaUrl && (
        <div>
          {mediaType === 'image' ? (
            <img src={mediaUrl} alt="Uploaded content" className="max-w-full h-auto" />
          ) : (
            <video src={mediaUrl} controls className="max-w-full h-auto" />
          )}
        </div>
      )}
      <Button type="submit" disabled={isLoading || !mediaUrl} className='ml-4'>
        {isLoading ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  )
}