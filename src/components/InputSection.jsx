import React, { useState } from 'react'
import { Trash2, Send, Upload } from 'lucide-react'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

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

  // 📄 PDF Upload Handler
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name) // ✅ store file name
    setExtracting(true)

    try {
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
      console.error("PDF extraction error:", error)
      alert("❌ Failed to extract text from PDF")
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

      {/* 📄 Upload Section (UPDATED UI) */}
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

        {/* Loader text */}
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
          placeholder="Paste your article, blog post, document, or upload a PDF... ✨"
          className="w-full h-56 p-4 pr-12 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-md 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none 
          transition-all duration-200 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed 
          text-gray-700 placeholder-gray-400 shadow-sm"
        />

        <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-transparent focus-within:ring-indigo-200 transition-all" />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium text-indigo-600 flex items-center gap-1">
          📊 {wordCount} words
        </span>
        <span className="text-xs text-gray-400">
          {value.length > 0 ? `${Math.ceil(value.length / 4.7)} min read` : 'Enter text'}
        </span>
      </div>

      {/* Validation */}
      <p className={`text-xs px-1 font-medium transition-all ${
        isValid ? 'text-green-600' : 'text-red-500'
      }`}>
        {wordCount} words / {characterCount} characters
        {!isValid && ` • Minimum: ${MIN_WORDS} words, ${MIN_CHARS} chars`}
      </p>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">

        {/* Clear */}
        <button
          onClick={onClear}
          disabled={disabled || !value}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
          bg-gray-100/80 backdrop-blur hover:bg-gray-200 text-gray-700 
          font-semibold rounded-xl transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>

        {/* Summarize */}
        <button
          onClick={onSummarize}
          disabled={disabled || extracting || !value.trim() || !isValid}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 
          text-white font-semibold rounded-xl transition-all duration-200 shadow-md
          ${
            isValid
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
          {disabled ? 'Summarizing...' : extracting ? 'Processing PDF...' : 'Summarize'}
        </button>

      </div>
    </div>
  )
}
