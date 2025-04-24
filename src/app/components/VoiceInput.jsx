"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"
import { startListening, stopListening } from "../../utils/speechRecognition"
import SoundWave from "./SoundWave"

export default function VoiceInput({ onSubmit }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isListening) {
        stopListening()
      }
    }
  }, [isListening])

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
      setIsListening(false)
      setTranscript("")
    } else {
      try {
        startListening({
          onResult: (finalTranscript) => {
            onSubmit(finalTranscript)
            setIsListening(false)
            setTranscript("")
          },
          onTranscriptChange: (currentTranscript) => {
            setTranscript(currentTranscript)
          },
          onEnd: () => {
            setIsListening(false)
            setTranscript("")
          },
        })
        setIsListening(true)
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleMicClick}
        className={`p-2 rounded-full flex items-center justify-center ${
          isListening ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </button>

      {isListening && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-3 shadow-lg min-w-[200px]">
          <SoundWave isActive={isListening} />
          <p className="text-white text-sm mt-2 text-center truncate max-w-[180px]">{transcript || "Listening..."}</p>
        </div>
      )}
    </div>
  )
}
