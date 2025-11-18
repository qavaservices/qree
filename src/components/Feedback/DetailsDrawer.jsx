import { motion, AnimatePresence } from 'framer-motion'

const DetailsDrawer = ({ isOpen, onClose, card }) => {
  // Placeholder data for static UI
  const displayCard = card || {
    client: 'Sample Client',
    category: 'Bug',
    description: 'This is a sample feedback description that will be displayed in the drawer.',
    priority: 'High',
    linearStatus: 'In Progress',
    linearTicketUrl: 'https://linear.app/example',
    createdAt: new Date().toISOString(),
  }

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
            className="fixed right-0 top-0 h-full w-full sm:w-full md:max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-lightest-gray flex items-center justify-between">
              <h2 className="text-xl font-semibold text-charcoal">Feedback Details</h2>
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
              {/* Top Section */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                    Client Name
                  </label>
                  <p className="text-lg font-semibold text-charcoal">{displayCard.client}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Category
                    </label>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-off-white text-gray inline-block">
                      {displayCard.category}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Priority
                    </label>
                    <span className="text-sm font-medium text-charcoal">{displayCard.priority}</span>
                  </div>
                </div>

                {displayCard.linearStatus && (
                  <div>
                    <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                      Linear Status
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded text-sm font-medium bg-off-white text-gray border border-lightest-gray">
                        {displayCard.linearStatus}
                      </span>
                      {displayCard.linearTicketUrl && (
                        <a
                          href={displayCard.linearTicketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray hover:text-charcoal underline flex items-center gap-1"
                        >
                          View Ticket
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide mb-1 block">
                    Description
                  </label>
                  <p className="text-gray leading-relaxed">{displayCard.description}</p>
                </div>
              </div>

              {/* Notes Section */}
              <div className="border-t border-lightest-gray pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-charcoal">Meeting Notes</h3>
                  <button className="text-sm text-gray hover:text-charcoal transition-colors">
                    Add Meeting Summary
                  </button>
                </div>

                {/* Notes Textarea */}
                <textarea
                  rows={6}
                  placeholder="Add your meeting notes here... (Auto-saves)"
                  className="w-full px-4 py-3 bg-off-white border border-lightest-gray rounded-lg 
                           text-charcoal placeholder-lighter-gray focus:outline-none focus:border-gray 
                           transition-colors resize-none mb-4"
                />

                {/* Notes History */}
                <div className="space-y-3">
                  <label className="text-xs font-medium text-lighter-gray uppercase tracking-wide block">
                    Notes History
                  </label>
                  <div className="space-y-3">
                    {/* Placeholder note */}
                    <div className="p-4 bg-off-white rounded-lg border border-lightest-gray">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray">Meeting Summary</span>
                        <span className="text-xs text-lighter-gray">
                          {new Date().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal">
                        Sample note entry. This will show the history of all notes added to this feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DetailsDrawer

