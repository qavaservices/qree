import { motion, AnimatePresence } from 'framer-motion'

const AddFeedbackModal = ({ isOpen, onClose }) => {
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-lightest-gray flex items-center justify-between">
                <h2 className="text-xl font-semibold text-charcoal">Add New Feedback</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-off-white transition-colors"
                >
                  <svg className="w-5 h-5 text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-6">
                <form className="space-y-6">
                  {/* Client Name */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Client Name
                    </label>
                    <select className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                                    text-charcoal focus:outline-none focus:border-gray transition-colors">
                      <option value="">Select a client</option>
                      <option value="client1">Client 1</option>
                      <option value="client2">Client 2</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Feedback Category
                    </label>
                    <select className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                                    text-charcoal focus:outline-none focus:border-gray transition-colors">
                      <option value="">Select category</option>
                      <option value="Discard">Discard</option>
                      <option value="Customer Feedback">Customer Feedback</option>
                      <option value="Bug">Bug</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter feedback description..."
                      className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                               text-charcoal placeholder-lighter-gray focus:outline-none focus:border-gray 
                               transition-colors resize-none"
                    />
                  </div>

                  {/* Meeting Date */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Meeting Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                               text-charcoal focus:outline-none focus:border-gray transition-colors"
                    />
                  </div>

                  {/* Linear Ticket URL */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Linear Ticket URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://linear.app/..."
                      className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                               text-charcoal placeholder-lighter-gray focus:outline-none focus:border-gray 
                               transition-colors"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Priority
                    </label>
                    <select className="w-full px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                                    text-charcoal focus:outline-none focus:border-gray transition-colors">
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-lightest-gray flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray hover:text-charcoal transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-charcoal text-off-white rounded-lg hover:bg-dark-gray 
                           transition-colors font-medium"
                >
                  Submit
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddFeedbackModal

