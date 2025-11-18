import { useState } from 'react'
import LeftNavigation from './components/Layout/LeftNavigation'
import TopBar from './components/Layout/TopBar'
import FeedbackGrid from './components/Feedback/FeedbackGrid'
import AddFeedbackModal from './components/Feedback/AddFeedbackModal'
import DetailsDrawer from './components/Feedback/DetailsDrawer'
import CalendarView from './components/Calendar/CalendarView'
import MeetingDetailsDrawer from './components/Meetings/MeetingDetailsDrawer'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [isMeetingDrawerOpen, setIsMeetingDrawerOpen] = useState(false)

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedCard(null)
  }

  const handleMeetingClick = (meeting, allMeetings) => {
    setSelectedMeeting({ meeting, allMeetings })
    setIsMeetingDrawerOpen(true)
  }

  const handleCloseMeetingDrawer = () => {
    setIsMeetingDrawerOpen(false)
    setSelectedMeeting(null)
  }

  const renderContent = () => {
    // Dashboard always shows calendar view
    return <CalendarView onMeetingClick={handleMeetingClick} />
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
      <MeetingDetailsDrawer
        isOpen={isMeetingDrawerOpen}
        onClose={handleCloseMeetingDrawer}
        meeting={selectedMeeting?.meeting}
        allMeetingsForDate={selectedMeeting?.allMeetings}
      />
    </div>
  )
}

export default App

