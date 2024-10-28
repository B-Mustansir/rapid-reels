import { SearchBar } from '@/components/explore/search-bar'
import { TrendingPosts } from '@/components/explore/trending-posts'
import { SuggestedUsers } from '@/components/explore/suggested-users'
import { ContentRecommendations } from '@/components/explore/content-recommendations'
import { Card } from '@/components/ui/card'

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Explore</h1>
      
      <SearchBar />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TrendingPosts />
          <ContentRecommendations />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="p-4">
            <SuggestedUsers />
          </Card>
        </div>
      </div>
    </div>
  )
}
