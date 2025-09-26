import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineAutoGraph } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='w-[250px] h-screen border-r border-r-gray-200 flex flex-col items-center  p-6 '>
      <p className='text-2xl font-medium mb-20 '>TripManagement</p>
      <ul className='text-lg flex flex-col gap-3 font-medium text-gray-700 w-full'>
        <li>
            <div className='flex items-center justify-start gap-2 px-3 py-2 rounded-xl bg-orange-500 text-white'>
            <LuLayoutDashboard />
            Dashboard
            </div>
            </li>
        <li>
            <div className='flex items-center justify-start gap-2 px-3 py-2 rounded-xl '>
            <MdOutlineAddBox  />
            Add Trip
            </div>
            </li>
        <li>
            <div className='flex items-center justify-start gap-2 px-3 py-2 rounded-xl '>
            <MdOutlineAutoGraph />
            Summary
            </div>
            </li>
      </ul>
    </div>
  )
}

export default Sidebar
