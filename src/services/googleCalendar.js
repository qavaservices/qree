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

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      reject(new Error('Timeout loading Google API'))
    }, 10000)

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      gapiLoaded = true
      window.gapi.load('client', () => {
        window.gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
        }).then(() => {
          clearTimeout(timeout)
          resolve()
        }).catch((err) => {
          clearTimeout(timeout)
          reject(err)
        })
      })
    }
    script.onerror = () => {
      clearTimeout(timeout)
      reject(new Error('Failed to load Google API script'))
    }
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

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      reject(new Error('Timeout loading Google Identity Services'))
    }, 10000)

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = () => {
      clearTimeout(timeout)
      gisLoaded = true
      resolve()
    }
    script.onerror = () => {
      clearTimeout(timeout)
      reject(new Error('Failed to load Google Identity Services script'))
    }
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

  // Check if there's an existing token in gapi client
  // Google Identity Services doesn't expose getToken(), so we rely on gapi client
  const restoreToken = () => {
    try {
      // Check gapi client for existing token
      if (window.gapi && window.gapi.client && window.gapi.client.getToken) {
        const token = window.gapi.client.getToken()
        if (token && token.access_token) {
          console.log('✅ Found existing token in gapi client')
          return true
        }
      }
    } catch (error) {
      // Silently fail - token might not exist yet
    }
    return false
  }

  // Try to restore token immediately
  if (!restoreToken()) {
    // If gapi client isn't ready yet, try multiple times with delays
    let attempts = 0
    const maxAttempts = 10
    const tryRestore = setInterval(() => {
      attempts++
      if (restoreToken() || attempts >= maxAttempts) {
        clearInterval(tryRestore)
        if (attempts >= maxAttempts) {
          console.log('Could not restore token after multiple attempts')
        }
      }
    }, 200)
  }

  return true
}

/**
 * Check if user is signed in
 * Note: Google Identity Services doesn't expose getToken(), so we check gapi client token
 */
export const isSignedIn = () => {
  // Check gapi client token (this is the reliable way)
  if (window.gapi && window.gapi.client && window.gapi.client.getToken) {
    try {
      const token = window.gapi.client.getToken()
      if (token && token.access_token) {
        return true
      }
    } catch (e) {
      // Token check failed
    }
  }
  
  // Fallback: Check localStorage to see if user was previously connected
  // This is just a hint - the actual token check is above
  try {
    const wasConnected = localStorage.getItem('google_calendar_connected') === 'true'
    return wasConnected
  } catch (e) {
    return false
  }
}

/**
 * Sign in to Google Calendar
 * @param {string} clientId - Google OAuth client ID
 * @param {boolean} silent - If true, tries to get token silently without prompt
 */
export const signIn = (clientId, silent = false) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
      reject(new Error('Google Identity Services not loaded'))
      return
    }

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) {
            console.error('Token request error:', response.error)
            reject(new Error(response.error))
          } else {
            // Set the token in gapi client
            if (window.gapi && window.gapi.client && response.access_token) {
              window.gapi.client.setToken({ access_token: response.access_token })
              console.log('✅ Token set in gapi client')
            }
            // Store authentication state in localStorage as backup
            try {
              localStorage.setItem('google_calendar_connected', 'true')
              localStorage.setItem('google_calendar_client_id', clientId)
              console.log('✅ Saved connection state to localStorage')
            } catch (e) {
              console.warn('Could not save to localStorage:', e)
            }
            resolve(response)
          }
        },
      })

      // Request token - silent mode tries without prompt, otherwise prompts for consent
      tokenClient.requestAccessToken({ prompt: silent ? 'none' : 'consent' })
    } catch (error) {
      console.error('Error initializing token client:', error)
      reject(new Error('Failed to initialize Google Calendar connection'))
    }
  })
}

/**
 * Sign out from Google Calendar
 */
export const signOut = () => {
  try {
    // Get token from gapi client to revoke it
    if (window.gapi && window.gapi.client && window.gapi.client.getToken) {
      try {
        const token = window.gapi.client.getToken()
        if (token && token.access_token) {
          // Try to revoke token if revoke method exists
          if (window.google && window.google.accounts && window.google.accounts.oauth2) {
            if (typeof window.google.accounts.oauth2.revoke === 'function') {
              window.google.accounts.oauth2.revoke(token.access_token)
            }
          }
        }
      } catch (e) {
        // Token might not exist, continue with cleanup
      }
    }
    
    // Clear token from gapi client
    if (window.gapi && window.gapi.client) {
      window.gapi.client.setToken(null)
    }
    
    // Clear localStorage backup
    try {
      localStorage.removeItem('google_calendar_connected')
      localStorage.removeItem('google_calendar_client_id')
    } catch (e) {
      console.warn('Could not clear localStorage:', e)
    }
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

/**
 * Fetch calendar events
 */
export const fetchCalendarEvents = async (timeMin = null, timeMax = null, maxResults = 50) => {
  if (!window.gapi || !window.gapi.client) {
    throw new Error('Google API not initialized')
  }

  // Ensure we have a token in gapi client
  const gapiToken = window.gapi.client.getToken()
  if (!gapiToken || !gapiToken.access_token) {
    throw new Error('User not signed in. Please connect your Google Calendar.')
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

