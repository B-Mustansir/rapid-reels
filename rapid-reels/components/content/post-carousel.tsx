"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PostCarouselProps {
  media_urls: string[]
}

export function PostCarousel({ media_urls }: PostCarouselProps) {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel 
      setApi={setApi}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {media_urls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={url}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {media_urls.length > 1 && (
        <>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-white/50 transition-all",
                  current === index + 1 && "bg-white"
                )}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  )
}
