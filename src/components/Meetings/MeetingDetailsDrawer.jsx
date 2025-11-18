import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'

const MeetingDetailsDrawer = ({ isOpen, onClose, meeting, allMeetingsForDate }) => {
  if (!meeting) return null

  const meetingDate = meeting.start?.dateTime 
    ? parseISO(meeting.start.dateTime)
    : meeting.start?.date 
    ? parseISO(meeting.start.date)
    : new Date()

  // Placeholder data - will be replaced with actual data from database/API
  const linearTickets = [
    // These will come from database - tickets linked to this meeting
    { id: '1', title: 'Fix login issue', status: 'In Progress', url: 'https://linear.app/...' },
    { id: '2', title: 'Add dark mode', status: 'Todo', url: 'https://linear.app/...' },
  ]

  const tasks = [
    // These will come from database - tasks for this meeting
    { id: '1', title: 'Follow up with client', completed: false },
    { id: '2', title: 'Send meeting summary', completed: true },
  ]

  const meetingNotes = [
    // These will come from database - notes for this meeting
    { id: '1', content: 'Discussed new feature requirements', createdAt: new Date(), type: 'note' },
    { id: '2', content: 'Client wants to see mockups next week', createdAt: new Date(), type: 'meeting_summary' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-full md:max-w-3xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-lightest-gray flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-charcoal">{meeting.summary || 'No title'}</h2>
                <p className="text-sm text-gray mt-1">
                  {format(meetingDate, 'EEEE, MMMM d, yyyy')} at {format(meetingDate, 'h:mm a')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-off-white transition-colors"
              >
                <svg className="w-5 h-5 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Meeting Info */}
              <div className="space-y-4">
                {meeting.description && (
                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Description
                    </label>
                    <p className="text-gray leading-relaxed">{meeting.description}</p>
                  </div>
                )}

                {meeting.location && (
                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Location
                    </label>
                    <p className="text-gray">{meeting.location}</p>
                  </div>
                )}

                {meeting.organizer && (
                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Organizer
                    </label>
                    <p className="text-gray">{meeting.organizer.email}</p>
                  </div>
                )}

                {meeting.htmlLink && (
                  <div>
                    <a
                      href={meeting.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray hover:text-charcoal underline flex items-center gap-1"
                    >
                      Open in Google Calendar
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Linear Tickets Section */}
              <div className="border-t border-lightest-gray pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-charcoal">Linear Tickets</h3>
                  <button className="text-sm text-gray hover:text-charcoal transition-colors">
                    Link Ticket
                  </button>
                </div>

                {linearTickets.length === 0 ? (
                  <div className="p-4 bg-off-white rounded-lg border border-lightest-gray text-center">
                    <p className="text-sm text-gray">No Linear tickets linked to this meeting</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {linearTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 bg-off-white rounded-lg border border-lightest-gray hover:border-gray transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-charcoal mb-1">{ticket.title}</h4>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-white text-gray border border-lightest-gray rounded">
                              {ticket.status}
                            </span>
                          </div>
                          {ticket.url && (
                            <a
                              href={ticket.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 p-2 text-gray hover:text-charcoal border border-lightest-gray rounded-lg hover:border-gray transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tasks Section */}
              <div className="border-t border-lightest-gray pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-charcoal">Tasks</h3>
                  <button className="text-sm text-gray hover:text-charcoal transition-colors">
                    Add Task
                  </button>
                </div>

                {tasks.length === 0 ? (
                  <div className="p-4 bg-off-white rounded-lg border border-lightest-gray text-center">
                    <p className="text-sm text-gray">No tasks for this meeting</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 bg-off-white rounded-lg border border-lightest-gray hover:border-gray transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className="w-4 h-4 text-charcoal border-gray rounded focus:ring-charcoal"
                        />
                        <span className={`text-sm flex-1 ${task.completed ? 'line-through text-lighter-gray' : 'text-charcoal'}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meeting Notes Section */}
              <div className="border-t border-lightest-gray pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-charcoal">Meeting Notes</h3>
                  <button className="text-sm text-gray hover:text-charcoal transition-colors">
                    Add Note
                  </button>
                </div>

                {/* Notes Textarea */}
                <textarea
                  rows={4}
                  placeholder="Add your meeting notes here... (Auto-saves)"
                  className="w-full px-4 py-3 bg-off-white border border-lightest-gray rounded-lg 
                           text-charcoal placeholder-lighter-gray focus:outline-none focus:border-gray 
                           transition-colors resize-none mb-4"
                />

                {/* Notes History */}
                {meetingNotes.length === 0 ? (
                  <div className="p-4 bg-off-white rounded-lg border border-lightest-gray text-center">
                    <p className="text-sm text-gray">No notes yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {meetingNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-off-white rounded-lg border border-lightest-gray"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray">
                            {note.type === 'meeting_summary' ? 'Meeting Summary' : 'Note'}
                          </span>
                          <span className="text-xs text-lighter-gray">
                            {format(note.createdAt, 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MeetingDetailsDrawer

