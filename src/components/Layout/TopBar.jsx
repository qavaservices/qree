import { motion } from 'framer-motion'

const TopBar = ({ onAddClick }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-20 bg-white border-b border-lightest-gray flex items-center justify-between px-4 md:px-8 gap-2"
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search feedback, clients, notes..."
            className="w-full px-4 py-2 pl-10 bg-off-white border border-lightest-gray rounded-lg 
                     text-charcoal placeholder-lighter-gray focus:outline-none focus:border-gray
                     transition-colors duration-200"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lighter-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filters */}
      <div className="hidden lg:flex items-center gap-4">
        <FilterDropdown label="Client" />
        <FilterDropdown label="Category" />
        <FilterDropdown label="Status" />
        <FilterDropdown label="Priority" />
      </div>

      {/* Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className="ml-6 w-10 h-10 bg-charcoal text-off-white rounded-lg flex items-center justify-center
                 hover:bg-dark-gray transition-colors duration-200 shadow-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </motion.header>
  )
}

const FilterDropdown = ({ label }) => {
  return (
    <div className="relative">
      <select className="px-4 py-2 bg-off-white border border-lightest-gray rounded-lg 
                        text-charcoal text-sm focus:outline-none focus:border-gray
                        appearance-none cursor-pointer pr-8 transition-colors duration-200">
        <option value="">{label}</option>
      </select>
      <svg
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-lighter-gray pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

export default TopBar

