"use client"

import { cn } from "@/lib/utils"
import AnimatedShinyText from "@/components/ui/animated-shiny-text"
import { Sparkles } from "lucide-react"

export function Header() {
  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          "group rounded-[32px] rounded-t-none px-2 pb-2 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="text-lg md:text-base"> Rapid Reels ✨ </span>
        </AnimatedShinyText>
      </div>
    </div>
  )
} 