"use client"
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const [token, setToken] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    
    // Try to get user info from localStorage if available
    const user = localStorage.getItem('user')
    if (user) {
      try {
        setUserInfo(JSON.parse(user))
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUserInfo(null)
    window.location.href = '/subscriber-login'
  }

  const handleRefreshToken = () => {
    // Force refresh the page to retry API calls
    window.location.reload()
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
      <h3 className="text-sm font-semibold text-yellow-800 mb-2">🔍 Authentication Debug</h3>
      
      <div className="text-xs space-y-1">
        <div>
          <strong>Token Status:</strong> {token ? '✅ Present' : '❌ Missing'}
        </div>
        <div>
          <strong>Token Preview:</strong> {token ? `${token.substring(0, 20)}...` : 'None'}
        </div>
        <div>
          <strong>User Info:</strong> {userInfo ? '✅ Present' : '❌ Missing'}
        </div>
        {userInfo && (
          <div>
            <strong>User Email:</strong> {userInfo.email || 'N/A'}
          </div>
        )}
      </div>
      
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleRefreshToken}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Logout & Re-login
        </button>
      </div>
    </div>
  )
}
