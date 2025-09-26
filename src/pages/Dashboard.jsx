// import React from 'react'
// import Navbar from '../components/Navbar'
// import Layout from '../components/Layout'
// import { FiSearch } from "react-icons/fi";
// import { MdFilterList } from "react-icons/md";

// const Dashboard = () => {
//   return (
//     <>
//       <div className='flex gap-4 items-center m-8'>
//       <div className='w-[50%] border py-4 px-6 rounded-full border-gray-200 bg-gray-200 flex gap-3 items-center justify-start'>
//       <FiSearch className='text-xl text-gray-600' />
//       <input type="search" name="search" id="search"  className='w-full outline-none text-xl' placeholder='Search Trip' />
//       </div>
      
//       <div className='flex items-center gap-2 text-xl'>
//       <MdFilterList />
//         Filter
//       </div>
//       <div className='flex items-center gap-2 text-xl'>
//       <MdFilterList />
//         Filter
//       </div>
//       </div>
//       <p>hi</p>
//     </>
//   )
// }

// export default Dashboard

import { useState, useMemo } from 'react'
import { useTrips } from '../context/TripsContext'
import TripCard from '../components/TripCard'
import SearchFilter from '../components/SearchFilter'
import Pagination from '../components/Pagination'
import TripCalendar from '../components/TripCalender'

const Dashboard = () => {
  const { trips, deleteTrip } = useTrips()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTrip, setSelectedTrip] = useState(null)
  
  const tripsPerPage = 6

  const filteredAndSortedTrips = useMemo(() => {
    let filtered = trips.filter(trip => {
      const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusFilter || trip.status === statusFilter
      return matchesSearch && matchesStatus
    })

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'date-asc':
            return new Date(a.startDate) - new Date(b.startDate)
          case 'date-desc':
            return new Date(b.startDate) - new Date(a.startDate)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [trips, searchTerm, statusFilter, sortBy])

  const totalPages = Math.ceil(filteredAndSortedTrips.length / tripsPerPage)
  const currentTrips = filteredAndSortedTrips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  )

  const handleDeleteTrip = (id) => {
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      deleteTrip(id)
      if (currentTrips.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const handleViewTrip = (trip) => {
    setSelectedTrip(trip)
  }

  const getStatusCounts = () => {
    return {
      total: trips.length,
      planned: trips.filter(trip => trip.status === 'PLANNED').length,
      ongoing: trips.filter(trip => trip.status === 'ONGOING').length,
      completed: trips.filter(trip => trip.status === 'COMPLETED').length
    }
  }

  const getAveragePrice = () => {
    if (trips.length === 0) return 0
    return Math.round(trips.reduce((sum, trip) => sum + trip.price, 0) / trips.length)
  }

  const getTotalValue = () => {
    return trips.reduce((sum, trip) => sum + trip.price, 0)
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🌟 Trip Dashboard</h1>
        <p className="text-gray-600">Manage and track all your travel adventures</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
              </div>
              <div className="text-3xl">🎒</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Cost</p>
                <p className="text-2xl font-bold text-green-600">${getAveragePrice()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Planned Trips</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.planned}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">${getTotalValue()}</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {currentTrips.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏖️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips found</h3>
          <p className="text-gray-500 mb-6">
            {trips.length === 0 
              ? "Start planning your first adventure!" 
              : "Try adjusting your search or filter criteria"}
          </p>
          {trips.length === 0 && (
            <button
              onClick={() => window.location.href = '/add'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Plan Your First Trip
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTrips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDeleteTrip}
                onView={handleViewTrip}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {selectedTrip && (
        <TripCalendar
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  )
}

export default Dashboard
