"use client"

import { useEffect, useState } from "react"

export default function SoundWave({ isActive }) {
  const [levels, setLevels] = useState([])

  // Generate random levels for the soundwave animation
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Generate 8 random bar heights
        const newLevels = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
        setLevels(newLevels)
      }, 150) // Update every 150ms for a natural feel

      return () => clearInterval(interval)
    } else {
      setLevels([])
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="flex items-center justify-center h-8 gap-1">
      {levels.map((level, index) => (
        <div
          key={index}
          className="w-1 bg-blue-500 rounded-full transition-all duration-150 ease-in-out"
          style={{
            height: `${Math.max(20, level)}%`,
            opacity: 0.7 + level / 300,
          }}
          data-level={level}
        />
      ))}
    </div>
  )
}
