"use client"

import { useEffect, useRef } from "react"

export default function AdvancedSoundWave({ isActive }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 60

    // Animation variables
    let time = 0
    const waves = [
      { frequency: 0.5, amplitude: 15, speed: 0.05, color: "#3b82f6" },
      { frequency: 1, amplitude: 10, speed: 0.07, color: "#60a5fa" },
      { frequency: 2, amplitude: 5, speed: 0.09, color: "#93c5fd" },
    ]

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          // Add some randomness to make it look more natural
          const randomFactor = isActive ? Math.random() * 3 : 0

          const y =
            canvas.height / 2 + Math.sin(x * wave.frequency * 0.01 + time * wave.speed) * wave.amplitude + randomFactor

          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.stroke()
      })

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  if (!isActive) return null

  return <canvas ref={canvasRef} className="w-full h-15" aria-hidden="true" />
}
