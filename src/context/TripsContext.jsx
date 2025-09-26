import { createContext, useContext, useState } from 'react'
import { initialTrips } from '../data/trips'

const TripsContext = createContext()

export const useTrips = () => {
  const context = useContext(TripsContext)
  if (!context) {
    throw new Error('useTrips must be used within a TripsProvider')
  }
  return context
}

export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState(initialTrips)

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      id: Math.max(...trips.map(t => t.id)) + 1,
      price: parseFloat(trip.price)
    }
    setTrips([...trips, newTrip])
  }

  const updateTrip = (id, updatedTrip) => {
    setTrips(trips.map(trip => 
      trip.id === parseInt(id) 
        ? { ...updatedTrip, id: parseInt(id), price: parseFloat(updatedTrip.price) }
        : trip
    ))
  }

  const deleteTrip = (id) => {
    setTrips(trips.filter(trip => trip.id !== id))
  }

  const getTripById = (id) => {
    return trips.find(trip => trip.id === parseInt(id))
  }

  return (
    <TripsContext.Provider value={{
      trips,
      addTrip,
      updateTrip,
      deleteTrip,
      getTripById
    }}>
      {children}
    </TripsContext.Provider>
  )
}