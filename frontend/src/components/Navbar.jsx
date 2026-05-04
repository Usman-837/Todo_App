import React from 'react'
import { Link } from "react-router-dom";
import "../index.css";

const   Navbar = () => {
  return (
    <nav className='flex justify-between bg-[#242424] text-white  px-[5px] py-[10px]'>
        <div className='text-2xl font-bold'>To Do App</div>
        <ul className='flex gap-x-[20px] font-medium hover:text-gray-300'>
            <li><Link to='/'>List</Link></li>
            <li><Link to='/add'>Add Task</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
