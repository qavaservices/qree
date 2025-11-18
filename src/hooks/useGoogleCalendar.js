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
      try {
        await initializeGapi(clientId)
        setIsInitialized(true)
        setIsAuthenticated(isSignedIn())
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [clientId])

  // Handle sign in
  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      await signIn(clientId)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err.message)
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

