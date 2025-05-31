'use client'
import { useState } from 'react'
import { FiSearch, FiTrendingUp, FiTarget, FiPlus } from 'react-icons/fi'

interface KeywordSuggestion {
  keyword: string
  volume: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  relevance: number
}

interface Props {
  productName: string
  category: string
  onKeywordSelect: (keyword: string) => void
}

const KeywordResearch = ({ productName, category, onKeywordSelect }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([])
  const [isResearching, setIsResearching] = useState(false)

  const generateKeywordSuggestions = async (term: string) => {
    setIsResearching(true)
    
    // Simulate keyword research (in real app, call keyword research API)
    setTimeout(() => {
      const baseSuggestions: KeywordSuggestion[] = [
        { keyword: `best ${term}`, volume: '2.4K', difficulty: 'Medium', relevance: 95 },
        { keyword: `${term} price`, volume: '1.8K', difficulty: 'Easy', relevance: 90 },
        { keyword: `${term} specifications`, volume: '1.2K', difficulty: 'Easy', relevance: 85 },
        { keyword: `${term} review`, volume: '3.1K', difficulty: 'Medium', relevance: 80 },
        { keyword: `${term} installation`, volume: '950', difficulty: 'Easy', relevance: 75 },
        { keyword: `professional ${category.toLowerCase()}`, volume: '1.5K', difficulty: 'Medium', relevance: 85 },
        { keyword: `${category.toLowerCase()} system`, volume: '2.8K', difficulty: 'Hard', relevance: 80 },
        { keyword: `${term} vs competitors`, volume: '650', difficulty: 'Easy', relevance: 70 },
        { keyword: `${term} features`, volume: '1.1K', difficulty: 'Easy', relevance: 85 },
        { keyword: `${term} manual`, volume: '450', difficulty: 'Easy', relevance: 60 }
      ]
      
      setSuggestions(baseSuggestions)
      setIsResearching(false)
    }, 1000)
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      generateKeywordSuggestions(searchTerm)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiSearch className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">Keyword Research</h3>
      </div>

      {/* Search Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Enter keyword related to ${productName}`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isResearching || !searchTerm.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isResearching ? 'Researching...' : 'Research'}
        </button>
      </div>

      {/* Quick Suggestions */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {[productName, category, `${productName} specs`, `best ${category}`].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchTerm(suggestion)
                generateKeywordSuggestions(suggestion)
              }}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Keyword Suggestions</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{suggestion.keyword}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(suggestion.difficulty)}`}>
                      {suggestion.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiTrendingUp className="w-3 h-3" />
                      {suggestion.volume}/month
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FiTarget className="w-3 h-3" />
                      {suggestion.relevance}% relevance
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onKeywordSelect(suggestion.keyword)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="w-3 h-3" />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default KeywordResearch