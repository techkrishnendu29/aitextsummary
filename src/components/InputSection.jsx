import React, { useState } from 'react'
import { Trash2, Send, Upload } from 'lucide-react'

export default function InputSection({ 
  value, 
  onChange, 
  onSummarize, 
  onClear, 
  disabled 
}) {

  const MIN_WORDS = 20
  const MIN_CHARS = 100

  const wordCount = value.trim().split(/\s+/).filter(w => w).length
  const characterCount = value.length

  const isValid = wordCount >= MIN_WORDS && characterCount >= MIN_CHARS

  const [extracting, setExtracting] = useState(false)
  const [fileName, setFileName] = useState("")

  // ✅ Load PDF.js from CDN (NO BUILD ERRORS EVER)
  const loadPDFJS = () => {
    return new Promise((resolve) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib)
        return
      }

      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"

      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
        resolve(window.pdfjsLib)
      }

      document.body.appendChild(script)
    })
  }

  // 📄 PDF Upload Handler (UPDATED)
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setExtracting(true)

    try {
      const pdfjsLib = await loadPDFJS()

      const reader = new FileReader()

      reader.onload = async function () {
        const typedarray = new Uint8Array(this.result)

        const pdf = await pdfjsLib.getDocument(typedarray).promise

        let fullText = ""

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()

          const pageText = content.items.map(item => item.str).join(" ")
          fullText += pageText + "\n\n"
        }

        onChange(fullText)
        setExtracting(false)
      }

      reader.readAsArrayBuffer(file)

    } catch (error) {
      console.error(error)
      alert("❌ PDF extraction failed")
      setExtracting(false)
    }
  }

  // ❌ Remove file
  const clearFile = () => {
    setFileName("")
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">📝</span> Your Text
        </label>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
          {characterCount.toLocaleString()} chars
        </span>
      </div>

      {/* 📄 Upload Section */}
      <div className="flex flex-col gap-2">

        {/* Upload Button */}
        <label className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all font-medium shadow-sm
          ${
            extracting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white hover:scale-[1.02]"
          }`}
        >
          <Upload className="w-4 h-4" />
          {extracting ? "Extracting PDF..." : "Upload PDF"}

          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
            className="hidden"
            disabled={extracting || disabled}
          />
        </label>

        {/* File Info */}
        {fileName && (
          <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm">
            <span className="truncate text-gray-700">📄 {fileName}</span>
            <button
              onClick={clearFile}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        )}

        {/* Loader */}
        {extracting && (
          <span className="text-xs text-gray-500 animate-pulse">
            Reading document...
          </span>
        )}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || extracting}
          placeholder="Paste your text or upload a PDF... ✨"
          className="w-full h-56 p-4 border border-gray-200 rounded-xl bg-white/70 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none 
          transition-all resize-none disabled:bg-gray-50 text-gray-700 shadow-sm"
        />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm">
        <span className="text-indigo-600">📊 {wordCount} words</span>
        <span className="text-gray-400">
          {value.length > 0 ? `${Math.ceil(value.length / 4.7)} min read` : 'Enter text'}
        </span>
      </div>

      {/* Validation */}
      <p className={`text-xs ${
        isValid ? 'text-green-600' : 'text-red-500'
      }`}>
        {wordCount} words / {characterCount} chars
      </p>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          onClick={onClear}
          disabled={disabled || !value}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>

        <button
          onClick={onSummarize}
          disabled={disabled || extracting || !isValid}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl
          ${
            isValid
              ? 'bg-gradient-to-r from-indigo-600 to-pink-500'
              : 'bg-gray-400'
          }`}
        >
          <Send className="w-4 h-4" />
          {extracting ? 'Processing PDF...' : 'Summarize'}
        </button>

      </div>
    </div>
  )
}
