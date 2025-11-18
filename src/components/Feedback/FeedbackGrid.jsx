import { motion } from 'framer-motion'

const FeedbackGrid = ({ onCardClick }) => {
  // Sample cards for UI demonstration (Stage 1 - no logic yet)
  const cards = [
    {
      id: '1',
      client: 'Acme Corp',
      category: 'Bug',
      description: 'Users are experiencing a login issue when using two-factor authentication. The verification code is not being accepted even when entered correctly.',
      priority: 'High',
      linearStatus: 'In Progress',
      createdAt: new Date('2024-01-15').toISOString(),
    },
    {
      id: '2',
      client: 'TechStart Inc',
      category: 'Customer Feedback',
      description: 'Request for dark mode support across all dashboard views. This has been mentioned in multiple meetings.',
      priority: 'Medium',
      linearStatus: 'Todo',
      createdAt: new Date('2024-01-14').toISOString(),
    },
    {
      id: '3',
      client: 'Global Solutions',
      category: 'Discard',
      description: 'Feature request for custom branding. After discussion, decided not to pursue this feature.',
      priority: 'Low',
      linearStatus: null,
      createdAt: new Date('2024-01-13').toISOString(),
    },
    {
      id: '4',
      client: 'DataFlow Systems',
      category: 'Bug',
      description: 'Export functionality is generating corrupted CSV files when the dataset exceeds 10,000 rows.',
      priority: 'High',
      linearStatus: 'Blocked',
      createdAt: new Date('2024-01-12').toISOString(),
    },
    {
      id: '5',
      client: 'CloudVault',
      category: 'Customer Feedback',
      description: 'Would like to see integration with Slack for real-time notifications about project updates.',
      priority: 'Medium',
      linearStatus: 'Needs Info',
      createdAt: new Date('2024-01-11').toISOString(),
    },
    {
      id: '6',
      client: 'SecureNet',
      category: 'Bug',
      description: 'Mobile app crashes when switching between tabs rapidly on iOS devices.',
      priority: 'High',
      linearStatus: 'Completed',
      createdAt: new Date('2024-01-10').toISOString(),
    },
  ]

  return (
    <div className="p-8">
      {cards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center h-96 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-off-white flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-lighter-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">No feedback yet</h3>
          <p className="text-light-gray max-w-md">
            Click the + button to add your first feedback card
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <FeedbackCard
              key={card.id}
              card={card}
              index={index}
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const FeedbackCard = ({ card, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="bg-white border border-lightest-gray rounded-lg p-6 cursor-pointer
               hover:shadow-lg transition-shadow duration-200"
    >
      {/* Client Name */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-charcoal">{card.client}</h3>
        <CategoryBadge category={card.category} />
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray mb-4 line-clamp-3">{card.description}</p>

      {/* Priority & Status */}
      <div className="flex items-center justify-between mb-4">
        <PriorityIndicator priority={card.priority} />
        <StatusBadge status={card.linearStatus || card.status} />
      </div>

      {/* Created Date */}
      <div className="text-xs text-lighter-gray">
        {new Date(card.createdAt).toLocaleDateString()}
      </div>
    </motion.div>
  )
}

const CategoryBadge = ({ category }) => {
  const categoryStyles = {
    'Discard': 'bg-off-white text-gray',
    'Customer Feedback': 'bg-off-white text-gray',
    'Bug': 'bg-off-white text-gray',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyles[category] || 'bg-off-white text-gray'}`}>
      {category}
    </span>
  )
}

const PriorityIndicator = ({ priority }) => {
  const priorityStyles = {
    'Low': { text: 'text-lighter-gray', bg: 'bg-lighter-gray' },
    'Medium': { text: 'text-gray', bg: 'bg-gray' },
    'High': { text: 'text-charcoal', bg: 'bg-charcoal' },
  }

  const style = priorityStyles[priority] || { text: 'text-lighter-gray', bg: 'bg-lighter-gray' }

  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 rounded-full ${style.bg}`}></div>
      <span className={`text-xs font-medium ${style.text}`}>
        {priority}
      </span>
    </div>
  )
}

const StatusBadge = ({ status }) => {
  if (!status) return null

  return (
    <span className="px-2 py-1 rounded text-xs font-medium bg-off-white text-gray border border-lightest-gray">
      {status}
    </span>
  )
}

export default FeedbackGrid

