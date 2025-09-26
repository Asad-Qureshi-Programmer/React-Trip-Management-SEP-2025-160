import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className='flex '>
        <Sidebar/>
        <div className=''>
            <Navbar/>
            <div className='m-3'>
            <Outlet/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout