import { useState } from 'react'
import LeftNavigation from './components/Layout/LeftNavigation'
import TopBar from './components/Layout/TopBar'
import FeedbackGrid from './components/Feedback/FeedbackGrid'
import AddFeedbackModal from './components/Feedback/AddFeedbackModal'
import DetailsDrawer from './components/Feedback/DetailsDrawer'
import MeetingsList from './components/Meetings/MeetingsList'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedCard(null)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'meetings':
        return <MeetingsList />
      case 'dashboard':
      default:
        return <FeedbackGrid onCardClick={handleCardClick} />
    }
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <LeftNavigation currentView={currentView} onNavigate={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onAddClick={() => setIsModalOpen(true)} />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
      <AddFeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <DetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer}
        card={selectedCard}
      />
    </div>
  )
}

export default App

