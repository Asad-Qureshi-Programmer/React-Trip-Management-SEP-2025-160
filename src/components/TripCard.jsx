import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDestinationImage } from '../services/imageService'

const TripCard = ({ trip, onDelete, onView }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    const loadImage = async () => {
      setImageLoading(true)
      try {
        const url = await getDestinationImage(trip.destination)
        setImageUrl(url)
      } catch (err) {
        setImageUrl(`https://picsum.photos/800/600?random=${trip.id}`)
      } finally {
        setImageLoading(false)
      }
    }

    loadImage()
  }, [trip.destination, trip.id])

  const statusClasses = {
    PLANNED: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    ONGOING: 'bg-blue-100 text-blue-800 border border-blue-200', 
    COMPLETED: 'bg-green-100 text-green-800 border border-green-200'
  }

  const statusEmojis = {
    PLANNED: '🗓️',
    ONGOING: '✈️',
    COMPLETED: '✅'
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const getDuration = () => Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
      <div className="relative overflow-hidden">
        {imageLoading ? (
          <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading {trip.destination}...</div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`View of ${trip.destination}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://picsum.photos/800/600?random=${trip.id}-fallback`
            }}
          />
        )}

        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[trip.status]} shadow-sm`}>
            {statusEmojis[trip.status]} {trip.status}
          </span>
        </div>

        {/* <div className="absolute bottom-3 left-3">
          <button
            onClick={(e) => { e.preventDefault(); setShowMap(!showMap) }}
            className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
          >
            📍 {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div> */}
        <div className="absolute bottom-3 left-3">
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.destination)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
  >
    📍 View on Map
  </a>
</div>

      </div>

      {/* {showMap && (
        <div className="border-t border-gray-100 bg-gray-50">
          <MapView destination={trip.destination} />
        </div>
      )} */}

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{trip.destination}</h3>
          <span className="text-2xl font-bold text-blue-600 ml-3">${trip.price.toLocaleString()}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trip.description || `Explore ${trip.destination} and create memories.`}</p>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium">📅 {formatDate(trip.startDate)}</span>
            <span className="text-gray-400">→</span>
            <span className="font-medium">{formatDate(trip.endDate)}</span>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">{getDuration()} days</span>
        </div>

        <div className="flex space-x-2">
          <button onClick={(e) => { e.preventDefault(); onView(trip) }} className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md">📅 View Calendar</button>
          <Link to={`/edit/${trip.id}`} className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 text-sm font-medium text-center">✏️ Edit</Link>
          <button onClick={(e) => { e.preventDefault(); onDelete(trip.id) }} className="flex-1 bg-red-50 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-100 text-sm font-medium border border-red-200">🗑️ Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TripCard
