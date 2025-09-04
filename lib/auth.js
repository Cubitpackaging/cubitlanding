import { supabase } from './supabase'

export class AuthService {
  // Sign in with email and password
  static async signIn(email, password) {
    try {
      console.log('Attempting sign in for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Supabase auth error:', error)
        throw error
      }

      if (!data.user) {
        console.error('No user returned from authentication')
        throw new Error('No user returned from authentication')
      }

      console.log('Sign in successful for:', data.user.email)
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
      
      if (error) {
        console.error('Session error:', error)
        return { success: false, error: error.message, session: null }
      }
      
      if (!session) {
        return { success: true, session: null, user: null }
      }
      
      return { success: true, session, user: session.user }
    } catch (error) {
      console.error('Session fetch error:', error)
      return { success: false, error: error.message, session: null }
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
    return user.email === adminEmail
  }

  // Password reset functionality
  static async resetPassword(email) {
    try {
      // Use production URL or current origin
      const resetUrl = process.env.NODE_ENV === 'production' 
        ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cubitlanding.vercel.app'}/admin/reset-password`
        : `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/admin/reset-password`
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetUrl
      })

      if (error) {
        throw error
      }

      return { success: true, message: 'Password reset email sent successfully' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Update password (after reset)
  static async updatePassword(newPassword) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        throw error
      }

      return { success: true, message: 'Password updated successfully' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Create new admin user (for user management)
  static async createAdminUser(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      })

      if (error) {
        throw error
      }

      return { success: true, user: data.user, message: 'Admin user created successfully' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Get all users (for admin management)
  static async getAllUsers() {
    try {
      // Note: This requires admin privileges in Supabase
      // You might need to create a database function or use the admin API
      
      // For now, we'll return a placeholder
      // In a real implementation, you'd need to set up proper user management
      return { success: true, users: [] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Check if current session is valid
  static async validateSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        return { success: false, error: error.message }
      }

      if (!session) {
        return { success: false, error: 'No active session' }
      }

      // Check if session is expired
      const now = new Date().getTime()
      const expiresAt = new Date(session.expires_at).getTime()
      
      if (now >= expiresAt) {
        return { success: false, error: 'Session expired' }
      }

      return { success: true, session }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}