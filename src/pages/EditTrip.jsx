import { useParams, Navigate } from 'react-router-dom'
import { useTrips } from '../context/TripsContext'
import TripForm from '../components/TripForm'

const EditTrip = () => {
  const { id } = useParams()
  const { getTripById } = useTrips()
  
  const trip = getTripById(id)
  
  if (!trip) {
    return <Navigate to="/" replace />
  }
  
  return <TripForm trip={trip} isEdit={true} />
}

export default EditTrip