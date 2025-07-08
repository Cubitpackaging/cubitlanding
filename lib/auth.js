import { supabase } from './supabase'

export class AuthService {
  // Sign in with email and password
  static async signIn(email, password) {
    try {
      console.log('Attempting to sign in with:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      console.log('Supabase sign in response:', { data, error })

      if (error) {
        console.error('Supabase sign in error:', error)
        throw error
      }

      if (!data.user) {
        console.error('No user returned from Supabase')
        throw new Error('No user returned from authentication')
      }

      console.log('Sign in successful:', data.user.email)
      return { success: true, user: data.user, session: data.session }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    }
  }

  // Sign out
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { success: true, user }
    } catch (error) {
      console.error('Get user error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get current session
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { success: true, session }
    } catch (error) {
      console.error('Get session error:', error)
      return { success: false, error: error.message }
    }
  }

  // Listen to auth changes
  static onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Check if user is admin (you can customize this logic)
  static async isAdmin(user = null) {
    if (!user) {
      const { success, user: currentUser } = await this.getCurrentUser()
      if (!success || !currentUser) return false
      user = currentUser
    }

    // Check if the user email matches the admin email
    const adminEmail = 'hi@cubitpackaging.com'
    console.log('Checking admin status for:', user.email, 'against:', adminEmail)
    return user.email === adminEmail
  }

  // Password reset functionality
  static async resetPassword(email) {
    try {
      console.log('Attempting password reset for:', email)
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`
      })

      console.log('Password reset response:', { data, error })

      if (error) {
        console.error('Password reset error:', error)
        throw error
      }

      console.log('Password reset email sent successfully')
      return { success: true, message: 'Password reset email sent successfully' }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: error.message }
    }
  }

  // Update password (after reset)
  static async updatePassword(newPassword) {
    try {
      console.log('Attempting to update password')
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      console.log('Password update response:', { data, error })

      if (error) {
        console.error('Password update error:', error)
        throw error
      }

      console.log('Password updated successfully')
      return { success: true, message: 'Password updated successfully' }
    } catch (error) {
      console.error('Password update error:', error)
      return { success: false, error: error.message }
    }
  }

  // Create new admin user (for user management)
  static async createAdminUser(email, password) {
    try {
      console.log('Attempting to create admin user:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      })

      console.log('Admin user creation response:', { data, error })

      if (error) {
        console.error('Admin user creation error:', error)
        throw error
      }

      console.log('Admin user created successfully')
      return { success: true, user: data.user, message: 'Admin user created successfully' }
    } catch (error) {
      console.error('Admin user creation error:', error)
      return { success: false, error: error.message }
    }
  }

  // Get all users (for admin management)
  static async getAllUsers() {
    try {
      // Note: This requires admin privileges in Supabase
      // You might need to create a database function or use the admin API
      console.log('Fetching all users...')
      
      // For now, we'll return a placeholder
      // In a real implementation, you'd need to set up proper user management
      return { success: true, users: [] }
    } catch (error) {
      console.error('Get all users error:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if current session is valid
  static async validateSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session validation error:', error)
        return { success: false, error: error.message }
      }

      if (!session) {
        console.log('No active session found')
        return { success: false, error: 'No active session' }
      }

      // Check if session is expired
      const now = new Date().getTime()
      const expiresAt = new Date(session.expires_at).getTime()
      
      if (now >= expiresAt) {
        console.log('Session expired')
        return { success: false, error: 'Session expired' }
      }

      console.log('Session is valid')
      return { success: true, session }
    } catch (error) {
      console.error('Session validation error:', error)
      return { success: false, error: error.message }
    }
  }
} 