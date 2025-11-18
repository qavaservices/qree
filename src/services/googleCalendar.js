/**
 * Google Calendar API Service
 * Handles authentication and fetching calendar events
 */

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

let gapiLoaded = false
let gisLoaded = false

/**
 * Load Google API script
 */
export const loadGapi = () => {
  return new Promise((resolve, reject) => {
    if (gapiLoaded) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      gapiLoaded = true
      window.gapi.load('client', () => {
        window.gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
        }).then(() => {
          resolve()
        }).catch(reject)
      })
    }
    script.onerror = reject
    document.body.appendChild(script)
  })
}

/**
 * Load Google Identity Services script
 */
export const loadGis = () => {
  return new Promise((resolve, reject) => {
    if (gisLoaded) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = () => {
      gisLoaded = true
      resolve()
    }
    script.onerror = reject
    document.body.appendChild(script)
  })
}

/**
 * Initialize Google API with client ID
 */
export const initializeGapi = async (clientId) => {
  await loadGapi()
  await loadGis()
  
  if (!window.gapi || !window.google) {
    throw new Error('Failed to load Google APIs')
  }

  return true
}

/**
 * Check if user is signed in
 */
export const isSignedIn = () => {
  if (!window.google) return false
  return window.google.accounts.oauth2.hasAccessToken()
}

/**
 * Sign in to Google Calendar
 */
export const signIn = (clientId) => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google Identity Services not loaded'))
      return
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error))
        } else {
          resolve(response)
        }
      },
    })

    tokenClient.requestAccessToken({ prompt: 'consent' })
  })
}

/**
 * Sign out from Google Calendar
 */
export const signOut = () => {
  if (window.google && window.google.accounts.oauth2) {
    const token = window.google.accounts.oauth2.getToken()
    if (token) {
      window.google.accounts.oauth2.revoke(token.access_token)
    }
  }
}

/**
 * Fetch calendar events
 */
export const fetchCalendarEvents = async (timeMin = null, timeMax = null, maxResults = 50) => {
  if (!window.gapi || !window.gapi.client) {
    throw new Error('Google API not initialized')
  }

  if (!isSignedIn()) {
    throw new Error('User not signed in')
  }

  const params = {
    calendarId: 'primary',
    timeMin: timeMin || new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  }

  if (timeMax) {
    params.timeMax = timeMax
  }

  try {
    const response = await window.gapi.client.calendar.events.list(params)
    return response.result.items || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    throw error
  }
}

/**
 * Get upcoming meetings (next 30 days)
 */
export const getUpcomingMeetings = async () => {
  const timeMin = new Date().toISOString()
  const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  
  return await fetchCalendarEvents(timeMin, timeMax)
}

/**
 * Get meetings for a specific date range
 */
export const getMeetingsInRange = async (startDate, endDate) => {
  const timeMin = new Date(startDate).toISOString()
  const timeMax = new Date(endDate).toISOString()
  
  return await fetchCalendarEvents(timeMin, timeMax)
}

