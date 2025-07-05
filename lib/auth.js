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
} 