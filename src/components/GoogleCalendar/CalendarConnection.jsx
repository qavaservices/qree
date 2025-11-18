import { motion } from 'framer-motion'
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar'

const CalendarConnection = () => {
  // Get Google Client ID from environment variable
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
  
  const {
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut,
  } = useGoogleCalendar(clientId)

  if (!clientId) {
    return (
      <div className="p-6 bg-off-white rounded-lg border border-lightest-gray">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-1">Google Calendar Not Configured</h3>
            <p className="text-xs text-gray">
              Please set VITE_GOOGLE_CLIENT_ID in your .env file to enable Google Calendar integration.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!isInitialized || isLoading) {
    return (
      <div className="p-6 bg-off-white rounded-lg border border-lightest-gray">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray">Initializing Google Calendar...</span>
        </div>
      </div>
    )
  }

  if (error) {
    const isPopupBlocked = error.toLowerCase().includes('popup') || error.toLowerCase().includes('blocked')
    
    return (
      <div className="p-6 bg-off-white rounded-lg border border-lightest-gray">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-charcoal mb-1">Error</h3>
            <p className="text-xs text-gray mb-2">{error}</p>
            {isPopupBlocked && (
              <p className="text-xs text-lighter-gray mb-3">
                💡 <strong>Tip:</strong> Make sure popups are allowed for this site. Check your browser's popup blocker settings.
              </p>
            )}
            <button
              onClick={signIn}
              className="text-xs text-charcoal hover:text-gray underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-off-white rounded-lg border border-lightest-gray">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Google Calendar</h3>
            <p className="text-xs text-lighter-gray">
              {isAuthenticated ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
        {isAuthenticated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signOut}
            className="px-4 py-2 text-sm text-gray hover:text-charcoal border border-lightest-gray rounded-lg 
                     hover:border-gray transition-colors"
          >
            Disconnect
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={signIn}
            className="px-4 py-2 text-sm bg-charcoal text-off-white rounded-lg hover:bg-dark-gray 
                     transition-colors"
          >
            Connect
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default CalendarConnection

