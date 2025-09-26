// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'
// import AddTrip from './pages/AddTrip'
// import EditTrip from './pages/EditTrip'
// import Layout from './components/Layout'




// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Layout/>} >
//         <Route index element={<Dashboard/>} />
//         <Route path='add' element={<AddTrip/>} />
//         <Route path='edit/:id' element={<EditTrip/>} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddTrip from './pages/AddTrip'
import EditTrip from './pages/EditTrip'
import { TripsProvider } from './context/TripsContext'

function App() {
  return (
    <TripsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTrip />} />
            <Route path="/edit/:id" element={<EditTrip />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TripsProvider>
  )
}

export default App
