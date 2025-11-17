"use client"
import { useState, useEffect } from 'react'
import { getMyNominations } from '@/services/subscriberService'

export default function TokenTest() {
  const [testResult, setTestResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testAPI = async () => {
    setIsLoading(true)
    setTestResult('Testing API call...')
    
    try {
      const result = await getMyNominations({ page: 1, limit: 5 })
      setTestResult(`✅ SUCCESS: Found ${result.data.length} nominations`)
    } catch (error: any) {
      setTestResult(`❌ ERROR: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setTestResult(`🔐 Token found: ${token.substring(0, 30)}...`)
    } else {
      setTestResult('❌ No token found in localStorage')
    }
  }

  const clearToken = () => {
    localStorage.removeItem('token')
    setTestResult('🗑️ Token cleared from localStorage')
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
      <h3 className="text-sm font-semibold text-blue-800 mb-2">🧪 API Test Panel</h3>
      
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          <strong>Current Status:</strong> {testResult}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={checkToken}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
          >
            Check Token
          </button>
          
          <button
            onClick={testAPI}
            disabled={isLoading}
            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test API'}
          </button>
          
          <button
            onClick={clearToken}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Clear Token
          </button>
        </div>
      </div>
    </div>
  )
}
