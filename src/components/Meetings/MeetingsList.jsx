import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns'
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar'
import CalendarConnection from '../GoogleCalendar/CalendarConnection'

const MeetingsList = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
  const {
    isAuthenticated,
    meetings,
    isLoadingMeetings,
    fetchMeetings,
    error,
  } = useGoogleCalendar(clientId)

  const [selectedDateRange, setSelectedDateRange] = useState('upcoming')

  useEffect(() => {
    if (isAuthenticated) {
      fetchMeetings()
    }
  }, [isAuthenticated, fetchMeetings])

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range)
    if (!isAuthenticated) return

    const now = new Date()
    let startDate, endDate

    switch (range) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0))
        endDate = new Date(now.setHours(23, 59, 59, 999))
        break
      case 'week':
        startDate = new Date()
        endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date()
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        break
      default: // upcoming
        startDate = new Date()
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    }

    fetchMeetings(startDate, endDate)
  }

  const formatMeetingTime = (event) => {
    if (!event.start) return 'No time specified'
    
    const start = event.start.dateTime 
      ? parseISO(event.start.dateTime)
      : parseISO(event.start.date)
    
    if (isToday(start)) {
      return `Today at ${format(start, 'h:mm a')}`
    } else if (isTomorrow(start)) {
      return `Tomorrow at ${format(start, 'h:mm a')}`
    } else if (isPast(start)) {
      return format(start, 'MMM d, yyyy h:mm a')
    } else {
      return format(start, 'MMM d, h:mm a')
    }
  }

  const getMeetingDate = (event) => {
    if (!event.start) return new Date()
    return event.start.dateTime 
      ? parseISO(event.start.dateTime)
      : parseISO(event.start.date)
  }

  // Sort meetings by date
  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = getMeetingDate(a)
    const dateB = getMeetingDate(b)
    return dateA - dateB
  })

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">Meetings</h1>
          <p className="text-gray">View and manage your Google Calendar meetings</p>
        </div>

        {/* Calendar Connection */}
        <div className="mb-8">
          <CalendarConnection />
        </div>

        {/* Date Range Filter */}
        {isAuthenticated && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-gray">Show:</span>
            {['today', 'week', 'month', 'upcoming'].map((range) => (
              <button
                key={range}
                onClick={() => handleDateRangeChange(range)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedDateRange === range
                    ? 'bg-charcoal text-off-white'
                    : 'bg-off-white text-gray hover:bg-lightest-gray'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Meetings List */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-off-white flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-lighter-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">Connect Google Calendar</h3>
            <p className="text-light-gray max-w-md mx-auto">
              Connect your Google Calendar to view and manage your meetings
            </p>
          </motion.div>
        ) : isLoadingMeetings ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-gray border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray">Loading meetings...</span>
          </div>
        ) : error ? (
          <div className="p-6 bg-off-white rounded-lg border border-lightest-gray">
            <p className="text-gray">{error}</p>
          </div>
        ) : sortedMeetings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-off-white flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-lighter-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No meetings found</h3>
            <p className="text-light-gray">No meetings scheduled for the selected time period</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {sortedMeetings.map((meeting, index) => {
              const meetingDate = getMeetingDate(meeting)
              const isPastMeeting = isPast(meetingDate)
              
              return (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow ${
                    isPastMeeting 
                      ? 'border-lightest-gray opacity-75' 
                      : 'border-lightest-gray'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-charcoal mb-2">
                        {meeting.summary || 'No title'}
                      </h3>
                      
                      {meeting.description && (
                        <p className="text-sm text-gray mb-4 line-clamp-2">
                          {meeting.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-lighter-gray">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatMeetingTime(meeting)}</span>
                        </div>

                        {meeting.location && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate max-w-xs">{meeting.location}</span>
                          </div>
                        )}

                        {meeting.organizer && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{meeting.organizer.email || 'Organizer'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {meeting.htmlLink && (
                      <a
                        href={meeting.htmlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 p-2 text-gray hover:text-charcoal border border-lightest-gray rounded-lg 
                                 hover:border-gray transition-colors"
                        title="Open in Google Calendar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to get meeting date
const getMeetingDate = (event) => {
  if (!event.start) return new Date()
  return event.start.dateTime 
    ? parseISO(event.start.dateTime)
    : parseISO(event.start.date)
}

export default MeetingsList

