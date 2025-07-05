'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '../../lib/auth'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    checkAuthStatus()
  }, [router])

  const checkAuthStatus = async () => {
    try {
      const { success, session } = await AuthService.getSession()
      console.log('Current session check:', { success, session })
      
      if (success && session) {
        const isAdmin = await AuthService.isAdmin(session.user)
        console.log('Is admin check:', isAdmin)
        
        if (isAdmin) {
          router.push('/admin/dashboard')
        }
      }
    } catch (error) {
      console.error('Auth status check error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt with:', credentials.email)

    try {
      const result = await AuthService.signIn(credentials.email, credentials.password)
      console.log('Login result:', result)
      
      if (result.success) {
        console.log('Login successful, checking admin status...')
        
        // Check if user is admin
        const isAdmin = await AuthService.isAdmin(result.user)
        console.log('Admin check result:', isAdmin)
        
        if (isAdmin) {
          console.log('Admin confirmed, redirecting to dashboard...')
          router.push('/admin/dashboard')
        } else {
          setError('Access denied. Admin privileges required.')
          await AuthService.signOut()
        }
      } else {
        console.error('Login failed:', result.error)
        setError(result.error || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login exception:', error)
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-gradient">Cubit</span> Admin
          </h1>
          <p className="text-gray-600">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Admin access required</p>
          <p className="mt-2 text-xs">
            Use: hi@cubitpackaging.com
          </p>
        </div>
      </div>
    </div>
  )
} 