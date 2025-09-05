'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '../../../lib/auth'
import AdminLayout from '../../../components/admin/AdminLayout'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [addUserLoading, setAddUserLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadUsers()
  }, [])

  const checkAuthAndLoadUsers = async () => {
    try {
      const { success, session } = await AuthService.getSession()
      
      if (!success || !session) {
        router.push('/admin')
        return
      }

      const isAdmin = await AuthService.isAdmin(session.user)
      if (!isAdmin) {
        router.push('/admin')
        return
      }

      // Load users (for now, just show current user since we don't have full user management setup)
      setUsers([
        {
          id: session.user.id,
          email: session.user.email,
          role: 'admin',
          created_at: session.user.created_at,
          last_sign_in_at: session.user.last_sign_in_at
        }
      ])
    } catch (error) {
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setAddUserLoading(true)
    setError('')
    setSuccess('')

    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match')
      setAddUserLoading(false)
      return
    }

    // Validate password strength
    if (newUser.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setAddUserLoading(false)
      return
    }

    try {
      const result = await AuthService.createAdminUser(newUser.email, newUser.password)
      
      if (result.success) {
        setSuccess('Admin user created successfully! They will receive a confirmation email.')
        setNewUser({ email: '', password: '', confirmPassword: '' })
        setShowAddUser(false)
        // In a real implementation, you'd refresh the users list here
      } else {
        setError(result.error || 'Failed to create admin user')
      }
    } catch (error) {
      setError('Failed to create admin user. Please try again.')
    } finally {
      setAddUserLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage admin users and their access</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors font-semibold"
          >
            Add Admin User
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Sign In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-primary hover:text-primary-hover transition-colors"
                        onClick={() => {
                          // In a real implementation, you'd have edit/delete functionality
                          alert('User management features coming soon!')
                        }}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Add New Admin User</h3>
              </div>
              
              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
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
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                    minLength={8}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false)
                      setNewUser({ email: '', password: '', confirmPassword: '' })
                      setError('')
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addUserLoading}
                    className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 font-semibold"
                  >
                    {addUserLoading ? 'Creating...' : 'Create Admin'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">User Management Info</h3>
              <div className="mt-1 text-sm text-blue-700">
                <p>• New admin users will receive a confirmation email</p>
                <p>• Only verified admin users can access the admin panel</p>
                <p>• Users can reset their passwords using the "Forgot Password" link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}