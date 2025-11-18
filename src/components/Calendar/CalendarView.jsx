import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns'
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar'
import CalendarConnection from '../GoogleCalendar/CalendarConnection'

const CalendarView = ({ onMeetingClick }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
  const {
    isAuthenticated,
    meetings,
    isLoadingMeetings,
    fetchMeetings,
  } = useGoogleCalendar(clientId)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Fetch meetings when month changes or when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const startOfCurrentMonth = startOfMonth(currentDate)
      const endOfCurrentMonth = endOfMonth(currentDate)
      console.log('Fetching meetings for:', format(startOfCurrentMonth, 'MMM yyyy'))
      fetchMeetings(startOfCurrentMonth, endOfCurrentMonth)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, isAuthenticated])

  // Get meetings for a specific date
  const getMeetingsForDate = (date) => {
    if (!meetings || meetings.length === 0) return []
    
    return meetings.filter(meeting => {
      if (!meeting.start) return false
      try {
        const meetingDate = meeting.start.dateTime 
          ? parseISO(meeting.start.dateTime)
          : parseISO(meeting.start.date)
        return isSameDay(meetingDate, date)
      } catch (e) {
        console.warn('Error parsing meeting date:', e, meeting)
        return false
      }
    })
  }
  
  // Debug: Log meetings when they change
  useEffect(() => {
    if (meetings && meetings.length > 0) {
      console.log(`📅 Loaded ${meetings.length} meetings for calendar view`)
      console.log('Sample meeting:', meetings[0])
    }
  }, [meetings])

  // Calendar grid
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    const meetingsForDate = getMeetingsForDate(date)
    if (meetingsForDate.length > 0 && onMeetingClick) {
      // If there are meetings, show the first one or a list
      onMeetingClick(meetingsForDate[0], meetingsForDate)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-charcoal mb-2">Dashboard</h1>
              <p className="text-gray">View your meetings in calendar format</p>
            </div>
          </div>
          
          {/* Calendar Connection */}
          <div className="mb-4">
            <CalendarConnection />
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-end gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousMonth}
              className="p-2 text-gray hover:text-charcoal border border-lightest-gray rounded-lg hover:border-gray transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToday}
              className="px-4 py-2 text-sm text-gray hover:text-charcoal border border-lightest-gray rounded-lg hover:border-gray transition-colors"
            >
              Today
            </motion.button>
            
            <h2 className="text-xl font-semibold text-charcoal min-w-[200px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextMonth}
              className="p-2 text-gray hover:text-charcoal border border-lightest-gray rounded-lg hover:border-gray transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Calendar Grid */}
        {!isAuthenticated ? (
          <div className="text-center py-16">
            <p className="text-gray">Please connect Google Calendar to view meetings</p>
          </div>
        ) : isLoadingMeetings ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-gray border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray">Loading meetings...</span>
          </div>
        ) : (
          <>
            {meetings.length === 0 && (
              <div className="mb-4 p-4 bg-off-white rounded-lg border border-lightest-gray text-center">
                <p className="text-sm text-gray">No meetings found for {format(currentDate, 'MMMM yyyy')}</p>
                <p className="text-xs text-lighter-gray mt-1">Try navigating to a different month or check your Google Calendar</p>
              </div>
            )}
            <div className="bg-white border border-lightest-gray rounded-lg overflow-hidden">
            {/* Week day headers */}
            <div className="grid grid-cols-7 border-b border-lightest-gray">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-gray border-r border-lightest-gray last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isToday = isSameDay(day, new Date())
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const dayMeetings = getMeetingsForDate(day)

                return (
                  <motion.div
                    key={day.toISOString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.01 }}
                    onClick={() => handleDateClick(day)}
                    className={`
                      min-h-[120px] p-2 border-r border-b border-lightest-gray
                      cursor-pointer transition-colors
                      ${!isCurrentMonth ? 'bg-off-white text-lighter-gray' : 'bg-white'}
                      ${isToday ? 'bg-off-white' : ''}
                      ${isSelected ? 'bg-lightest-gray' : ''}
                      hover:bg-off-white
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`
                          text-sm font-medium
                          ${isToday ? 'w-6 h-6 rounded-full bg-charcoal text-off-white flex items-center justify-center' : ''}
                          ${!isCurrentMonth ? 'text-lighter-gray' : 'text-charcoal'}
                        `}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>

                    {/* Meetings for this day */}
                    <div className="space-y-1">
                      {dayMeetings.slice(0, 3).map((meeting) => (
                        <motion.div
                          key={meeting.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onMeetingClick) {
                              onMeetingClick(meeting, dayMeetings)
                            }
                          }}
                          className="text-xs p-1.5 bg-charcoal text-off-white rounded truncate hover:bg-dark-gray transition-colors cursor-pointer"
                          title={meeting.summary || 'No title'}
                        >
                          {format(parseISO(meeting.start.dateTime || meeting.start.date), 'h:mm a')} - {meeting.summary || 'No title'}
                        </motion.div>
                      ))}
                      {dayMeetings.length > 3 && (
                        <div className="text-xs text-gray font-medium px-1.5">
                          +{dayMeetings.length - 3} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CalendarView

