'use client'

import { useState, useEffect } from 'react'
import { AuthService } from '../lib/auth'

export default function AuthDebug() {
  const [authState, setAuthState] = useState({
    loading: true,
    user: null,
    session: null,
    isAdmin: false,
    error: null
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const sessionResult = await AuthService.getSession()
      const userResult = await AuthService.getCurrentUser()
      
      let isAdmin = false
      if (sessionResult.success && sessionResult.session) {
        isAdmin = await AuthService.isAdmin(sessionResult.session.user)
      }

      setAuthState({
        loading: false,
        user: userResult.success ? userResult.user : null,
        session: sessionResult.success ? sessionResult.session : null,
        isAdmin,
        error: sessionResult.error || userResult.error || null
      })
    } catch (error) {
      setAuthState({
        loading: false,
        user: null,
        session: null,
        isAdmin: false,
        error: error.message
      })
    }
  }

  if (authState.loading) {
    return <div className="p-4 bg-gray-100 rounded">Loading auth state...</div>
  }

  return (
    <div className="p-4 bg-gray-100 rounded mb-4">
      <h3 className="font-bold mb-2">Authentication Debug</h3>
      <div className="space-y-2 text-sm">
        <div>
          <strong>User:</strong> {authState.user ? authState.user.email : 'None'}
        </div>
        <div>
          <strong>Session:</strong> {authState.session ? 'Active' : 'None'}
        </div>
        <div>
          <strong>Is Admin:</strong> {authState.isAdmin ? 'Yes' : 'No'}
        </div>
        {authState.error && (
          <div className="text-red-600">
            <strong>Error:</strong> {authState.error}
          </div>
        )}
      </div>
      <button 
        onClick={checkAuth}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Refresh
      </button>
    </div>
  )
} 