import React, { useState } from 'react'
import axios from 'axios'
import { Sparkles, Loader } from 'lucide-react'
import InputSection from './components/InputSection'
import StyleSelector from './components/StyleSelector'
import SummaryDisplay from './components/SummaryDisplay'
import Stats from './components/Stats'
import Footer from './components/Footer'

const API_URL = "https://textsumarizer.onrender.com";

export default function App() {
  const [text, setText] = useState('')
  const [style, setStyle] = useState('brief')
  const [result, setResult] = useState(null)
  const [submittedText, setSubmittedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize')
      return
    }

    setLoading(true)
    setError(null)
    setSubmittedText(text)

    const startTime = performance.now()

    try {
      const response = await axios.post(`${API_URL}/api/summarize`, {
        text: text.trim(),
        style: style,
      })

      const endTime = performance.now()
      const totalTime = ((endTime - startTime) / 1000).toFixed(2)

      if (!response.data || !response.data.summary) {
        throw new Error("Invalid response")
      }

      setResult({
        ...response.data,
        elapsed_seconds: parseFloat(totalTime)
      })

    } catch (err) {
      let errorMsg = "Failed"
      if (err.response) errorMsg = `Server Error: ${err.response.status}`
      else if (err.request) errorMsg = "No response from server"
      else errorMsg = err.message

      setError(errorMsg)

    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setText('')
    setResult(null)
    setSubmittedText('')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">

      {/* Header */}
     <header className="py-10 text-center text-white relative">

  {/* Glow background */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

  {/* Title */}
  <div className="flex items-center justify-center gap-3 mb-3">
    <Sparkles className="w-7 h-7 animate-pulse text-yellow-300" />

    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-pink-200 bg-clip-text text-transparent">
      TextSage AI
    </h1>

    <Sparkles className="w-7 h-7 animate-pulse text-yellow-300" />
  </div>

  {/* Tagline */}
  <p className="text-base md:text-lg text-indigo-100 font-medium">
    ✨ Understand more, read less ✨
  </p>

  {/* Subline */}
  <p className="text-xs md:text-sm text-indigo-200 mt-1 tracking-wide">
    AI-Powered Text Summarization 
  </p>

</header>

      {/* Main */}
      <main className="flex-1 px-4 pb-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 h-full">

          {/* Input Card */}
          <div className="h-full">
            <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 flex flex-col">
              <div className="p-5 flex flex-col h-full">
                
                <InputSection
                  value={text}
                  onChange={setText}
                  onSummarize={handleSummarize}
                  onClear={handleClear}
                  disabled={loading}
                />

                <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                <StyleSelector
                  selectedStyle={style}
                  onChange={setStyle}
                  disabled={loading}
                />

              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className="h-full">
            <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 flex flex-col">
              <div className="p-5 flex flex-col h-full">

                {/* Error */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    ⚠️ {error}
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-600 text-sm">
                      Generating summary...
                    </p>
                  </div>
                )}

                {/* Result */}
                {result && !loading && (
                  <div className="flex-1 flex flex-col gap-5 overflow-hidden">
                    <SummaryDisplay summary={result} />
                    <Stats result={result} inputText={submittedText} />
                  </div>
                )}

                {/* Empty */}
                {!loading && !error && !result && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                    <div className="text-5xl">✨</div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Start summarizing
                    </h3>
                    <p className="text-sm text-gray-500">
                      Paste your text and choose a style
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}