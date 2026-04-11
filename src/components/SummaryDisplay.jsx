import React, { useState } from 'react'
import { Copy, Download, Check } from 'lucide-react'

export default function SummaryDisplay({ summary }) {
  const [copied, setCopied] = useState(false)

  // ✅ CRITICAL FIX: prevent crash on initial render
  if (!summary || !summary.summary) {
    return null
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' +
        encodeURIComponent(summary.summary || '')
    )
    element.setAttribute('download', `summary-${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex flex-col gap-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span>✨</span> Summary
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            title="Download summary"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Summary Content */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-100 max-h-64 overflow-y-auto">
        <div className="space-y-3">
          {(summary.summary || '').split('\n').map((line, idx) => {
            if (!line.trim()) return null

            if (line.startsWith('•')) {
              return (
                <p key={idx} className="text-gray-700 text-sm leading-relaxed">
                  {line}
                </p>
              )
            }

            if (line.startsWith('Keywords:')) {
              return (
                <p key={idx} className="text-indigo-700 text-sm font-semibold">
                  {line}
                </p>
              )
            }

            return (
              <p key={idx} className="text-gray-700 text-sm leading-relaxed">
                {line}
              </p>
            )
          })}
        </div>
      </div>

      {/* Keywords Section */}
      {Array.isArray(summary.top_keywords) &&
        summary.top_keywords.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wider">
              🏷️ Top Keywords
            </p>

            <div className="flex flex-wrap gap-2">
              {summary.top_keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}