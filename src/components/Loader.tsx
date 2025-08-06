"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import LightRays from "@/assets/LightRays"
import { ReactElement } from "react"

interface LogoProgressLoaderProps {
  onComplete?: () => void
  logo?: ReactElement
  className?: string
}

export default function Loader({ onComplete, logo, className }: LogoProgressLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "centering" | "curtain-opening" | "complete">("loading")
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Real asset loading detection
    const loadAssets = async () => {
      const imageUrls = [
        "/lovable-uploads/d3fac077-8817-4abf-801c-aa5b5bb25f05.png",
        "/banner-bg1.jpg",
        "/duct-bg.png",
        "/female.jpg",
        "/male.jpg"
      ]

      const loadImage = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => reject()
          img.src = src
        })
      }

      try {
        await Promise.all(imageUrls.map(loadImage))
        setAssetsLoaded(true)
      } catch (error) {
        console.warn("Some assets failed to load:", error)
        setAssetsLoaded(true) // Continue anyway
      }
    }

    loadAssets()
  }, [])

  useEffect(() => {
    if (!assetsLoaded) return

    // Phase 1: Progress bar animation (0-100% over 2.5 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Phase 2: Move logo to center
          setTimeout(() => setPhase("centering"), 200)
          return 100
        }
        return prev + 100 / 125 // 2.5 seconds at 20ms intervals
      })
    }, 20)

    return () => clearInterval(progressInterval)
  }, [assetsLoaded])

  useEffect(() => {
    if (phase === "centering") {
      // Phase 3: Curtain opening transition
      setTimeout(() => setPhase("curtain-opening"), 800)
    } else if (phase === "curtain-opening") {
      // Phase 4: Complete after curtain animation
      setTimeout(() => {
        setPhase("complete")
        onComplete?.()
        // Dispatch custom event for other components to listen to
        window.dispatchEvent(new CustomEvent('loader-complete'))
      }, 1500)
    }
  }, [phase, onComplete])

  if (phase === "complete") return null

  return (
    <>
      {/* Main Loading Screen - Curtain Effect */}
      <div
        data-loader="true"
        className={cn(
          "fixed inset-0 z-50 transition-all duration-1500 ease-in-out",
          phase === "curtain-opening" ? "transform translate-x-full" : "transform translate-x-0",
          className,
        )}
      >
        {/* Loading Screen Content */}
        <div className="absolute inset-0 bg-[#00131A] flex items-center justify-center">
          {/* LightRays Background */}
          <div className="absolute inset-0 w-full h-full">
            <LightRays
              raysOrigin="top-center"
              raysColor="#29F0C6"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>

          {/* Background Elements */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              phase === "curtain-opening" && "opacity-0",
            )}
          >
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,240,198,0.2),transparent_70%)]" />
          </div>

          {/* Header */}
          <div
            className={cn(
              "absolute top-12 left-1/2 transform -translate-x-1/2 transition-all duration-700",
              phase === "centering" && "opacity-0 -translate-y-4",
              phase === "curtain-opening" && "opacity-0 -translate-y-8",
            )}
          >
            <div className="text-center">
              <h1 className="text-white/90 text-sm font-medium tracking-[0.2em] uppercase">Loading Experience</h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-2 mx-auto" />
            </div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-8">
            {/* Progress Bar Section */}
            <div
              className={cn(
                "relative w-full transition-all duration-700 ease-out",
                phase === "centering" && "opacity-0 scale-95 -translate-y-8",
                phase === "curtain-opening" && "opacity-0 scale-90 -translate-y-12",
              )}
            >
              {/* Progress Bar Track */}
              <div className="relative h-6 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                {/* Progress Bar Fill */}
                <div
                  className="h-full bg-gradient-to-r from-[#29F0C6] via-[#29F0C6] to-[#FFD700] rounded-full transition-all duration-100 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              </div>

              {/* Logo Knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
                style={{
                  left: `${progress}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-2xl border border-white/20">
                  {/* Logo - No Blur */}
                  <div className="transition-all duration-300">
                    {logo}
                  </div>
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#29F0C6]/20 to-[#FFD700]/20 blur-sm" />
                </div>
              </div>
            </div>

            {/* Progress Text */}
            <div
              className={cn(
                "mt-8 text-center transition-all duration-700",
                phase === "centering" && "opacity-0 -translate-y-4",
                phase === "curtain-opening" && "opacity-0 -translate-y-8",
              )}
            >
              <div className="text-white/80 text-lg font-light tabular-nums">{Math.round(progress)}%</div>
              <div className="text-white/50 text-xs mt-1 tracking-[0.15em] uppercase font-medium">
                {assetsLoaded ? "Preparing Experience" : "Loading Assets..."}
              </div>
            </div>
          </div>

          {/* Centered Logo (Final Position) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-800 ease-out",
              phase === "loading" && "opacity-0 scale-50",
              phase === "centering" && "opacity-100 scale-100",
              phase === "curtain-opening" && "opacity-0 scale-110 translate-x-8",
            )}
          >
            <div className="relative">
              {/* Main Logo */}
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl border border-white/10">
                <div className="transition-all duration-300">
                  {logo}
                </div>
              </div>

              {/* Elegant Glow Ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#29F0C6]/30 to-[#FFD700]/30 blur-xl animate-pulse" />

              {/* Outer Ring */}
              <div className="absolute -inset-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm" />
            </div>
          </div>
        </div>

        {/* Right Edge Shadow for Curtain Effect */}
        <div
          className={cn(
            "absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/20 to-transparent transition-opacity duration-500",
            phase === "curtain-opening" && "opacity-0",
          )}
        />
      </div>
    </>
  )
}
