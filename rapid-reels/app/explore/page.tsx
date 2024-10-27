import { SearchBar } from '@/components/explore/search-bar'
import { TrendingPosts } from '@/components/explore/trending-posts'
import { SuggestedUsers } from '@/components/explore/suggested-users'
import { ContentRecommendations } from '@/components/explore/content-recommendations'

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <TrendingPosts />
          <ContentRecommendations />
        </div>
        <div className="space-y-6">
          <SuggestedUsers />
        </div>
      </div>
    </div>
  )
}
