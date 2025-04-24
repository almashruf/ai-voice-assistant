"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Loader } from "lucide-react"
import VoiceInput from "./components/VoiceInput"

export default function Page() {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")

  const handleSubmit = async (prompt) => {
    setLoading(true)
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Unknown error")
      setResponses((prev) => [...prev, json.result])
    } catch (err) {
      setResponses((prev) => [...prev, `**Error:** ${err.message}`])
    } finally {
      setLoading(false)
    }
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      handleSubmit(text.trim())
      setText("")
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-900" style={{ backgroundColor: "#212121" }}>
      {/* Main content grows to fill */}
      <main className="flex-grow overflow-auto pb-32">
        <div className="max-w-3xl mx-auto p-4 space-y-6">
         
          {responses.map((resp, idx) => (
            <article key={idx} className="prose max-w-none bg-black text-white p-6 rounded shadow-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{resp}</ReactMarkdown>
            </article>
          ))}

          {loading && (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <Loader className="h-8 w-8 text-blue-500 animate-spin mb-2" />
              <div className="flex items-center space-x-1">
                <span className="text-white">Thinking</span>
                <span className="text-white animate-pulse delay-100">.</span>
                <span className="text-white animate-pulse delay-200">.</span>
                <span className="text-white animate-pulse delay-300">.</span>
              </div>
            </div>
          )}


          {responses.length === 0 && !loading && (
            <p className="text-center text-gray-400">Tap the mic or type below to ask something!</p>
          )}
        </div>
      </main>

      {/* Fixed footer at bottom center */}
      <footer className="fixed inset-x-0 bottom-0 p-4" style={{ backgroundColor: "#212121" }}>
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Line 1: Header */}
          <h1 className="text-center text-2xl font-bold text-white">My Voice Assistant</h1>

          {/* Line 2: Text input + mic */}
          <form onSubmit={handleTextSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <VoiceInput onSubmit={handleSubmit} />
            {loading && (
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </form>
        </div>
      </footer>
    </div>
  )
}
