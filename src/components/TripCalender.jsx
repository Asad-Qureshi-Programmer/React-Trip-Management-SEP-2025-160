import { useState } from 'react'

const TripCalendar = ({ trip, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(trip.startDate))
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  const isDateInRange = (date) => {
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    return date >= start && date <= end
  }
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const getDuration = () => {
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isInRange = isDateInRange(date)
      const isStart = date.toDateString() === new Date(trip.startDate).toDateString()
      const isEnd = date.toDateString() === new Date(trip.endDate).toDateString()
      
      days.push(
        <div
          key={day}
          className={`p-2 text-center text-sm rounded-lg ${
            isInRange
              ? isStart || isEnd
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-blue-100 text-blue-800'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      )
    }
    
    return days
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-90vh overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              📅 {trip.destination} Trip
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              <p className="font-medium">📍 Destination: {trip.destination}</p>
              <p className="mt-1">🗓 Duration: {getDuration()} days</p>
              <p className="mt-1">📅 {formatDate(new Date(trip.startDate))} → {formatDate(new Date(trip.endDate))}</p>
              <p className="mt-1">💰 Cost: ${trip.price}</p>
              <p className="mt-1">📊 Status: {trip.status}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <h4 className="text-lg font-semibold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
          
          <div className="mt-6 flex space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Start/End Date</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-100 rounded"></div>
              <span>Trip Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripCalendar