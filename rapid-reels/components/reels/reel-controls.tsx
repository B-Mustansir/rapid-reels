import { ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReelControlsProps {
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function ReelControls({ onNext, onPrevious, hasNext, hasPrevious }: ReelControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
      {/* <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="text-white hover:bg-white/20"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!hasNext}
        className="text-white hover:bg-white/20"
      >
        <ChevronDown className="h-6 w-6" />
      </Button> */}
    </div>
  )
}
