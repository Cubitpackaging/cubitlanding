'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { AuthService } from '../../../lib/auth'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalImages: 0,
    totalQuotes: 0,
    totalRushOrders: 0
  })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log('🔵 Dashboard component mounted')
    // Check authentication
    checkAuth()
  }, [router])

  const checkAuth = async () => {
    try {
      console.log('🔵 Dashboard: Checking authentication...')
      const { success, session } = await AuthService.getSession()
      console.log('🔵 Dashboard: Session check result:', { success, session })
      
      if (!success || !session) {
        console.log('🔴 Dashboard: No session found, redirecting to login')
        router.push('/admin')
        return
      }

      const isAdmin = await AuthService.isAdmin(session.user)
      console.log('🔵 Dashboard: Admin check result:', isAdmin)
      
      if (!isAdmin) {
        console.log('🔴 Dashboard: User is not admin, redirecting to login')
        router.push('/admin')
        return
      }

      console.log('✅ Dashboard: User authenticated as admin:', session.user.email)
      setUser(session.user)
      // Load dashboard stats
      loadStats()
    } catch (error) {
      console.error('🔴 Dashboard: Auth check failed:', error)
      router.push('/admin')
    }
  }

  const loadStats = async () => {
    try {
      console.log('📊 Dashboard: Loading dashboard stats...')
      const response = await fetch('/api/admin/stats')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 Dashboard: Stats loaded:', data)
      setStats(data)
    } catch (error) {
      console.error('🔴 Dashboard: Failed to load stats:', error)
      // Set default stats if loading fails
      setStats({
        totalProducts: 0,
        totalImages: 0,
        totalQuotes: 0,
        totalRushOrders: 0
      })
    } finally {
      console.log('📊 Dashboard: Setting loading to false')
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await AuthService.signOut()
      router.push('/admin')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  console.log('🔵 Dashboard render: loading =', loading, 'user =', user?.email)

  if (loading) {
    console.log('🔵 Dashboard: Showing loading state')
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="ml-4 text-gray-600">Loading dashboard...</p>
        </div>
      </AdminLayout>
    )
  }

  console.log('🔵 Dashboard: Rendering main dashboard content')
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Images</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Quote Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rush Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRushOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-8 h-8 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <div className="text-left">
                <p className="font-medium">Manage Products</p>
                <p className="text-sm text-gray-600">Add, edit, or delete products</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/admin/images')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-8 h-8 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-left">
                <p className="font-medium">Manage Images</p>
                <p className="text-sm text-gray-600">Upload and organize images</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/admin/submissions')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-left">
                <p className="font-medium">View Submissions</p>
                <p className="text-sm text-gray-600">Review quote requests</p>
              </div>
            </button>

            <button
              onClick={() => router.push('/admin/users')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <div className="text-left">
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-gray-600">Add and manage admin users</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">✅ EmailJS configured successfully</p>
                <p className="text-xs text-gray-600">Email forms are now working</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">🔐 Supabase authentication active</p>
                <p className="text-xs text-gray-600">Admin panel secured with Supabase</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">📊 Dashboard ready</p>
                <p className="text-xs text-gray-600">All admin features available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 