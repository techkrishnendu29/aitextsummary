import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-8 py-6 px-4 bg-black/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto text-center text-white space-y-2">

        {/* Developer */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span>Developed by</span>
          <span className="font-semibold">Krishnendu Ghosh</span>
        </div>

        {/* Website */}
        <p className="text-xs text-indigo-200">
          🌐 Visit: 
          <a 
            href="https://www.krishnendughosh.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-white"
          >
            www.krishnendughosh.in
          </a>
        </p>

        {/* Project Info */}
        <p className="text-xs text-indigo-200">
          AI-powered Text Summarizer using Python & NLP
        </p>

        {/* Copyright */}
        <p className="text-xs text-indigo-300 mt-2">
          © {new Date().getFullYear()} Krishnendu Ghosh. All rights reserved.
        </p>

        {/* Policy */}
        <p className="text-[11px] text-indigo-300 max-w-xl mx-auto leading-relaxed">
          This tool is intended for educational and informational purposes only. 
          Do not use it for plagiarism, misinformation, or unethical content generation. 
          The developer is not responsible for misuse of generated outputs.
        </p>

      </div>
    </footer>
  )
}