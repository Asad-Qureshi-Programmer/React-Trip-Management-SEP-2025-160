// import React from 'react'

// const Navbar = () => {
//   return (
//     <div className='w-[calc(100vw-250px)] h-[70px]  flex items-center justify-between text-lg  border-b border-gray-200 px-10'>
//       <div>
//         <p className='text-sm text-gray-600'>Dashboard</p>
//         <p className='text-2xl font-medium text-orange-500'>Dashboard</p>
//       </div>  
      
//       <button className='bg-orange-500 text-white px-4 py-1 rounded-full'>Add Trip</button>
//     </div>
//   )
// }

// export default Navbar


import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-gray-900 transition-colors">
              TripManager
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/add" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Trip
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
