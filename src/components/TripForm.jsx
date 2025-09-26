import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTrips } from '../context/TripsContext'

const TripForm = ({ trip = null, isEdit = false }) => {
  const navigate = useNavigate()
  const { addTrip, updateTrip } = useTrips()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    reset 
  } = useForm({
    defaultValues: trip || {
      destination: '',
      startDate: '',
      endDate: '',
      price: '',
      status: 'PLANNED',
      description: ''
    }
  })

  const startDate = watch('startDate')

  const onSubmit = (data) => {
    if (isEdit && trip) {
      updateTrip(trip.id, data)
    } else {
      addTrip(data)
    }
    navigate('/')
  }

  const validateEndDate = (endDate) => {
    if (!startDate || !endDate) return true
    return new Date(endDate) > new Date(startDate) || "End date must be after start date"
  }

  const validateStartDate = (startDateValue) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(startDateValue)
    return selectedDate >= today || "Start date cannot be in the past"
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? '✏️ Edit Trip' : '➕ Add New Trip'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Update your trip details' : 'Plan your next adventure'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📍 Destination *
            </label>
            <input
              type="text"
              {...register('destination', { 
                required: 'Destination is required',
                minLength: { value: 2, message: 'Destination must be at least 2 characters' }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Where are you going?"
            />
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Description
            </label>
            <textarea
              {...register('description', {
                maxLength: { value: 200, message: 'Description cannot exceed 200 characters' }
              })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              placeholder="Tell us about your trip plans..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🗓 Start Date *
              </label>
              <input
                type="date"
                {...register('startDate', { 
                  required: 'Start date is required',
                  validate: validateStartDate
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏁 End Date *
              </label>
              <input
                type="date"
                {...register('endDate', {
                  required: 'End date is required',
                  validate: validateEndDate
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💰 Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' },
                  max: { value: 100000, message: 'Price cannot exceed $100,000' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Status
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="PLANNED">🟡 Planned</option>
                <option value="ONGOING">🔵 Ongoing</option>
                <option value="COMPLETED">🟢 Completed</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isEdit ? '💾 Update Trip' : '➕ Add Trip'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TripForm