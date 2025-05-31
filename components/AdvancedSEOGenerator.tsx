'use client'
import { useState, useEffect } from 'react'
import { FiTarget, FiCheckCircle, FiAlertCircle, FiXCircle, FiRefreshCw, FiEye, FiSearch, FiTrendingUp } from 'react-icons/fi'
import KeywordResearch from './KeywordResearch'

interface SEOData {
  focusKeyword: string
  title: string
  description: string
  keywords: string[]
}

interface SEOAnalysis {
  score: number
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'
  checks: SEOCheck[]
}

interface SEOCheck {
  name: string
  status: 'pass' | 'warning' | 'fail'
  message: string
  points: number
  maxPoints: number
}

interface Props {
  seoData: SEOData
  productName: string
  productCategory: string
  longDescription: string
  onSEOUpdate: (seo: SEOData) => void
}

const AdvancedSEOGenerator = ({ seoData, productName, productCategory, longDescription, onSEOUpdate }: Props) => {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google')

  // Real-time SEO analysis
  useEffect(() => {
    if (seoData.focusKeyword && seoData.title && seoData.description) {
      analyzeSEO()
    }
  }, [seoData, longDescription, productName])

  const analyzeSEO = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay for better UX
    setTimeout(() => {
      const checks = performSEOChecks()
      const totalPoints = checks.reduce((sum, check) => sum + check.points, 0)
      const maxTotalPoints = checks.reduce((sum, check) => sum + check.maxPoints, 0)
      const score = Math.round((totalPoints / maxTotalPoints) * 100)
      
      const analysis: SEOAnalysis = {
        score,
        grade: getGrade(score),
        checks
      }
      
      setAnalysis(analysis)
      generateSuggestions(checks)
      setIsAnalyzing(false)
    }, 1000)
  }

  const performSEOChecks = (): SEOCheck[] => {
    const checks: SEOCheck[] = []
    const { focusKeyword, title, description } = seoData

    // Focus Keyword in Title
    const keywordInTitle = title.toLowerCase().includes(focusKeyword.toLowerCase())
    checks.push({
      name: 'Focus Keyword in Title',
      status: keywordInTitle ? 'pass' : 'fail',
      message: keywordInTitle 
        ? `Great! Focus keyword "${focusKeyword}" found in title.`
        : `Focus keyword "${focusKeyword}" not found in title. Add it for better SEO.`,
      points: keywordInTitle ? 15 : 0,
      maxPoints: 15
    })

    // Focus Keyword in Description
    const keywordInDesc = description.toLowerCase().includes(focusKeyword.toLowerCase())
    checks.push({
      name: 'Focus Keyword in Description',
      status: keywordInDesc ? 'pass' : 'fail',
      message: keywordInDesc 
        ? `Excellent! Focus keyword found in meta description.`
        : `Add focus keyword "${focusKeyword}" to meta description.`,
      points: keywordInDesc ? 15 : 0,
      maxPoints: 15
    })

    // Title Length Check
    const titleLength = title.length
    let titleStatus: 'pass' | 'warning' | 'fail' = 'pass'
    let titleMessage = ''
    let titlePoints = 0

    if (titleLength === 0) {
      titleStatus = 'fail'
      titleMessage = 'Title is empty. Add a compelling title.'
      titlePoints = 0
    } else if (titleLength < 30) {
      titleStatus = 'warning'
      titleMessage = `Title is too short (${titleLength} chars). Aim for 30-60 characters.`
      titlePoints = 5
    } else if (titleLength > 60) {
      titleStatus = 'warning'
      titleMessage = `Title is too long (${titleLength} chars). Keep it under 60 characters.`
      titlePoints = 5
    } else {
      titleStatus = 'pass'
      titleMessage = `Perfect title length (${titleLength} characters).`
      titlePoints = 10
    }

    checks.push({
      name: 'Title Length',
      status: titleStatus,
      message: titleMessage,
      points: titlePoints,
      maxPoints: 10
    })

    // Description Length Check
    const descLength = description.length
    let descStatus: 'pass' | 'warning' | 'fail' = 'pass'
    let descMessage = ''
    let descPoints = 0

    if (descLength === 0) {
      descStatus = 'fail'
      descMessage = 'Meta description is empty.'
      descPoints = 0
    } else if (descLength < 120) {
      descStatus = 'warning'
      descMessage = `Description is too short (${descLength} chars). Aim for 120-160 characters.`
      descPoints = 5
    } else if (descLength > 160) {
      descStatus = 'warning'
      descMessage = `Description is too long (${descLength} chars). Keep it under 160 characters.`
      descPoints = 5
    } else {
      descStatus = 'pass'
      descMessage = `Perfect description length (${descLength} characters).`
      descPoints = 10
    }

    checks.push({
      name: 'Meta Description Length',
      status: descStatus,
      message: descMessage,
      points: descPoints,
      maxPoints: 10
    })

    // Keyword Density in Long Description
    if (longDescription) {
      const keywordCount = (longDescription.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length
      const wordCount = longDescription.split(' ').length
      const density = (keywordCount / wordCount) * 100

      let densityStatus: 'pass' | 'warning' | 'fail' = 'pass'
      let densityMessage = ''
      let densityPoints = 0

      if (density === 0) {
        densityStatus = 'fail'
        densityMessage = 'Focus keyword not found in content.'
        densityPoints = 0
      } else if (density < 0.5) {
        densityStatus = 'warning'
        densityMessage = `Keyword density is low (${density.toFixed(1)}%). Aim for 0.5-2.5%.`
        densityPoints = 5
      } else if (density > 2.5) {
        densityStatus = 'warning'
        densityMessage = `Keyword density is high (${density.toFixed(1)}%). Keep it under 2.5%.`
        densityPoints = 5
      } else {
        densityStatus = 'pass'
        densityMessage = `Great keyword density (${density.toFixed(1)}%).`
        densityPoints = 10
      }

      checks.push({
        name: 'Keyword Density',
        status: densityStatus,
        message: densityMessage,
        points: densityPoints,
        maxPoints: 10
      })
    }

    // Title Begins with Focus Keyword
    const titleStartsWithKeyword = title.toLowerCase().startsWith(focusKeyword.toLowerCase())
    checks.push({
      name: 'Keyword at Beginning of Title',
      status: titleStartsWithKeyword ? 'pass' : 'warning',
      message: titleStartsWithKeyword 
        ? 'Excellent! Title starts with focus keyword.'
        : 'Consider starting title with focus keyword for better SEO.',
      points: titleStartsWithKeyword ? 10 : 5,
      maxPoints: 10
    })

    // Keywords Count Check
    const keywordCount = seoData.keywords.filter(k => k.trim()).length
    checks.push({
      name: 'SEO Keywords Count',
      status: keywordCount >= 5 ? 'pass' : 'warning',
      message: keywordCount >= 5 
        ? `Good! You have ${keywordCount} keywords.`
        : `Add more keywords. Current: ${keywordCount}, recommended: 5+`,
      points: keywordCount >= 5 ? 10 : keywordCount * 2,
      maxPoints: 10
    })

    // Product Name in Title
    const productInTitle = title.toLowerCase().includes(productName.toLowerCase())
    checks.push({
      name: 'Product Name in Title',
      status: productInTitle ? 'pass' : 'warning',
      message: productInTitle 
        ? 'Product name found in title.'
        : 'Consider including product name in title.',
      points: productInTitle ? 5 : 2,
      maxPoints: 5
    })

    // Category in Keywords
    const categoryInKeywords = seoData.keywords.some(k => 
      k.toLowerCase().includes(productCategory.toLowerCase())
    )
    checks.push({
      name: 'Category in Keywords',
      status: categoryInKeywords ? 'pass' : 'warning',
      message: categoryInKeywords 
        ? 'Product category found in keywords.'
        : 'Add product category to keywords.',
      points: categoryInKeywords ? 5 : 2,
      maxPoints: 5
    })

    return checks
  }

  const getGrade = (score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' => {
    if (score >= 95) return 'A+'
    if (score >= 85) return 'A'
    if (score >= 75) return 'B'
    if (score >= 65) return 'C'
    if (score >= 50) return 'D'
    return 'F'
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100'
      case 'A': return 'text-green-600 bg-green-100'
      case 'B': return 'text-blue-600 bg-blue-100'
      case 'C': return 'text-yellow-600 bg-yellow-100'
      case 'D': return 'text-orange-600 bg-orange-100'
      case 'F': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const generateSuggestions = (checks: SEOCheck[]) => {
    const suggestions: string[] = []
    
    const failedChecks = checks.filter(check => check.status === 'fail')
    const warningChecks = checks.filter(check => check.status === 'warning')

    if (failedChecks.length > 0) {
      suggestions.push('Fix critical SEO issues first (marked in red)')
    }
    
    if (warningChecks.length > 0) {
      suggestions.push('Improve warning items for better SEO score')
    }

    // Specific suggestions based on analysis
    if (!seoData.title.toLowerCase().includes(seoData.focusKeyword.toLowerCase())) {
      suggestions.push(`Include "${seoData.focusKeyword}" in your title`)
    }

    if (seoData.title.length < 30) {
      suggestions.push('Make your title longer and more descriptive')
    }

    if (seoData.description.length < 120) {
      suggestions.push('Expand your meta description with more details')
    }

    if (seoData.keywords.length < 5) {
      suggestions.push('Add more relevant keywords for better coverage')
    }

    setSuggestions(suggestions)
  }

  const autoOptimizeSEO = () => {
    const { focusKeyword } = seoData
    
    // Generate optimized title
    const optimizedTitle = `${focusKeyword} - ${productName} | ${productCategory} Security Solutions`
    
    // Generate optimized description
    const optimizedDesc = `${focusKeyword}: ${longDescription.substring(0, 100)}... Professional ${productCategory.toLowerCase()} security solutions with advanced features and reliable performance.`
    
    // Generate comprehensive keywords
    const optimizedKeywords = [
      focusKeyword,
      productName.toLowerCase(),
      productCategory.toLowerCase(),
      `${focusKeyword} price`,
      `${focusKeyword} specifications`,
      `best ${focusKeyword}`,
      `professional ${productCategory.toLowerCase()}`,
      'security camera',
      'surveillance system',
      'hikvision',
      'cctv camera',
      'security solutions'
    ].filter((keyword, index, array) => array.indexOf(keyword) === index) // Remove duplicates

    const optimizedSEO = {
      ...seoData,
      title: optimizedTitle.length <= 60 ? optimizedTitle : optimizedTitle.substring(0, 57) + '...',
      description: optimizedDesc.length <= 160 ? optimizedDesc : optimizedDesc.substring(0, 157) + '...',
      keywords: optimizedKeywords
    }

    onSEOUpdate(optimizedSEO)
  }

  const renderPreview = () => {
    switch (previewMode) {
      case 'google':
        return (
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="text-xs text-gray-500 mb-1">yoursite.com/products/{productName.toLowerCase().replace(/\s+/g, '-')}</div>
            <div className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 line-clamp-1">
              {seoData.title || 'Your SEO Title Here'}
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {seoData.description || 'Your meta description will appear here...'}
            </div>
          </div>
        )
      case 'facebook':
        return (
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="h-32 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-3">
              <div className="text-xs text-gray-500 uppercase mb-1">yoursite.com</div>
              <div className="font-medium text-gray-900 mb-1 line-clamp-1">
                {seoData.title || 'Your SEO Title Here'}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {seoData.description || 'Your meta description...'}
              </div>
            </div>
          </div>
        )
      case 'twitter':
        return (
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="h-40 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-3">
              <div className="font-medium text-gray-900 mb-1 line-clamp-2">
                {seoData.title || 'Your SEO Title Here'}
              </div>
              <div className="text-sm text-gray-600 line-clamp-1">
                {seoData.description || 'Your meta description...'}
              </div>
              <div className="text-xs text-gray-500 mt-2">yoursite.com</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* SEO Score Dashboard */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiTarget className="w-5 h-5 text-blue-600" />
            SEO Analysis
          </h3>
          <button
            onClick={autoOptimizeSEO}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Auto Optimize
          </button>
        </div>

        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Analyzing SEO...</span>
          </div>
        ) : analysis ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Circle */}
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke={analysis.score >= 80 ? '#10b981' : analysis.score >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3"
                    strokeDasharray={`${analysis.score}, 100`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-gray-900">{analysis.score}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getGradeColor(analysis.grade)}`}>
                    {analysis.grade}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">Passed Checks</div>
                <div className="text-xl font-bold text-green-600">
                  {analysis.checks.filter(c => c.status === 'pass').length}/{analysis.checks.length}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Focus Keyword</div>
                <div className="text-sm font-medium text-gray-900">{seoData.focusKeyword || 'Not set'}</div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">Quick Fixes</div>
              <div className="space-y-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-start gap-2">
                    <FiAlertCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Detailed SEO Checks */}
      {analysis && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900">SEO Check Details</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {analysis.checks.map((check, index) => (
              <div key={index} className="px-6 py-4 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {check.status === 'pass' && <FiCheckCircle className="w-5 h-5 text-green-500" />}
                  {check.status === 'warning' && <FiAlertCircle className="w-5 h-5 text-yellow-500" />}
                  {check.status === 'fail' && <FiXCircle className="w-5 h-5 text-red-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{check.name}</h5>
                    <span className="text-sm text-gray-500">{check.points}/{check.maxPoints} pts</span>
                  </div>
                  <p className="text-sm text-gray-600">{check.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <FiEye className="w-4 h-4" />
              SEO Preview
            </h4>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['google', 'facebook', 'twitter'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    previewMode === mode
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          {renderPreview()}
        </div>
      </div>

      {/* Keyword Research */}
      <KeywordResearch
        productName={productName}
        category={productCategory}
        onKeywordSelect={(keyword) => {
          const newKeywords = [...seoData.keywords]
          if (!newKeywords.includes(keyword)) {
            newKeywords.push(keyword)
            onSEOUpdate({ ...seoData, keywords: newKeywords })
          }
        }}
      />
    </div>
  )
}

export default AdvancedSEOGenerator 