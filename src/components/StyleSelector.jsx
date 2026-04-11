import React from 'react'
import { Zap, List, FileText, Tag } from 'lucide-react'

const STYLES = [
  { id: 'brief', name: 'Brief', description: 'Top 3 sentences', icon: Zap },
  { id: 'bullet', name: 'Bullet', description: 'Top 5 as bullets', icon: List },
  { id: 'detailed', name: 'Detailed', description: 'Top 7 sentences', icon: FileText },
  { id: 'keywords', name: 'Keywords', description: 'Terms + summary', icon: Tag },
]

export default function StyleSelector({ selectedStyle, onChange, disabled }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <span>🎨</span> Summary Style
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {STYLES.map((style) => {
          const Icon = style.icon
          const isSelected = selectedStyle === style.id

          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              disabled={disabled}
              className={`relative p-4 rounded-xl transition-all transform hover:scale-105 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                  ✓
                </div>
              )}

              <Icon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-semibold text-sm">{style.name}</p>
              <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                {style.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}