import { useState, useEffect, useCallback } from 'react'
import {
  initializeGapi,
  signIn,
  signOut,
  isSignedIn,
  getUpcomingMeetings,
  getMeetingsInRange,
} from '../services/googleCalendar'

/**
 * Custom hook for Google Calendar integration
 */
export const useGoogleCalendar = (clientId) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [meetings, setMeetings] = useState([])
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false)

  // Initialize Google API
  useEffect(() => {
    if (!clientId) {
      setIsLoading(false)
      setError('Google Client ID not configured')
      return
    }

    const init = async () => {
      // Overall timeout for initialization (15 seconds)
      const initTimeout = setTimeout(() => {
        setIsLoading(false)
        setError('Initialization timeout. Please check your internet connection and try refreshing the page.')
        console.error('Google Calendar initialization timeout')
      }, 15000)

      try {
        await initializeGapi(clientId)
        clearTimeout(initTimeout)
        setIsInitialized(true)
        
        // Check localStorage backup first
        const wasConnected = localStorage.getItem('google_calendar_connected') === 'true'
        const storedClientId = localStorage.getItem('google_calendar_client_id')
        
        if (wasConnected && storedClientId === clientId) {
          console.log('Found previous connection in localStorage, attempting to restore...')
        }
        
        // Wait for APIs to be fully ready, then check authentication
        // Try multiple times with increasing delays to ensure token is restored
        const checkAuth = async (attempt = 0) => {
          // Limit to 5 attempts (about 3 seconds total)
          if (attempt > 5) {
            // If we had a previous connection but can't restore token, user might need to reconnect
            if (wasConnected) {
              console.warn('Previous connection found but token could not be restored. User may need to reconnect.')
            }
            setIsAuthenticated(false)
            setIsLoading(false)
            return
          }
          
          const authenticated = isSignedIn()
          if (authenticated) {
            setIsAuthenticated(true)
            setIsLoading(false)
            console.log('✅ Successfully restored Google Calendar connection')
          } else if (attempt < 5) {
            // Try again after a delay
            setTimeout(() => checkAuth(attempt + 1), 500)
          } else {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
        }
        
        // Start checking after initial delay
        setTimeout(() => checkAuth(0), 300)
      } catch (err) {
        clearTimeout(initTimeout)
        setError(err.message || 'Failed to initialize Google Calendar. Please check your internet connection.')
        setIsLoading(false)
        console.error('Google Calendar initialization error:', err)
      }
    }

    init()
  }, [clientId])

  // Try to restore connection automatically if localStorage indicates previous connection
  // Only tries silent restore - no popup
  useEffect(() => {
    if (isInitialized && !isAuthenticated && clientId) {
      const wasConnected = localStorage.getItem('google_calendar_connected') === 'true'
      const storedClientId = localStorage.getItem('google_calendar_client_id')
      
      if (wasConnected && storedClientId === clientId) {
        // Try to silently get token (no popup)
        console.log('Attempting to restore connection silently...')
        const tryRestore = async () => {
          try {
            await signIn(clientId, true) // true = silent mode, no popup
            setIsAuthenticated(true)
            console.log('✅ Successfully restored connection silently')
          } catch (err) {
            console.log('Could not restore silently (this is normal if token expired):', err.message)
            // Clear localStorage if silent restore fails - user needs to reconnect manually
            localStorage.removeItem('google_calendar_connected')
            localStorage.removeItem('google_calendar_client_id')
            // Don't show error, just let user reconnect manually if needed
          }
        }
        // Wait a bit for APIs to be fully ready
        setTimeout(tryRestore, 1000)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated, clientId])

  // Auto-fetch meetings when authenticated state changes
  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      // Fetch meetings for current month
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      fetchMeetings(startOfMonth, endOfMonth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isInitialized])

  // Handle sign in
  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Attempting to sign in to Google Calendar...')
      await signIn(clientId, false) // Always prompt for consent when user clicks
      setIsAuthenticated(true)
      console.log('✅ Successfully signed in to Google Calendar')
    } catch (err) {
      console.error('Sign in error:', err)
      setError(err.message || 'Failed to connect to Google Calendar. Please try again.')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [clientId])

  // Handle sign out
  const handleSignOut = useCallback(() => {
    try {
      signOut()
      setIsAuthenticated(false)
      setMeetings([])
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  // Fetch upcoming meetings
  const fetchMeetings = useCallback(async (startDate = null, endDate = null) => {
    if (!isAuthenticated) {
      setError('Not authenticated')
      return
    }

    try {
      setIsLoadingMeetings(true)
      setError(null)
      
      let events
      if (startDate && endDate) {
        events = await getMeetingsInRange(startDate, endDate)
      } else {
        events = await getUpcomingMeetings()
      }
      
      setMeetings(events)
    } catch (err) {
      setError(err.message)
      setMeetings([])
    } finally {
      setIsLoadingMeetings(false)
    }
  }, [isAuthenticated])

  return {
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    meetings,
    isLoadingMeetings,
    signIn: handleSignIn,
    signOut: handleSignOut,
    fetchMeetings,
  }
}

