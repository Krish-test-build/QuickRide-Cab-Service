import React from 'react'
import quickImg from '../assets/quick_img.jpeg';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png'




const Start = () => {
  return (
    <div className='flex h-screen w-full justify-between   flex-col'>
      <img className='w-30 h-auto left-4 top-3 absolute z-[60]' src={icon} />
        <img className='bg-cover' src={quickImg} alt="" />
        <div className='bg-white py-3 px-5'>
            <h2 className='text-2xl font-semibold '>
                Get Started with QuickRide
            </h2>
            <Link to={'/login'} className=' inline-block text-center w-full bg-black text-white mt-3 mb-3 p-2 rounded-lg text-xl'>
                Continue
            </Link>
        </div>
    </div>
  )
}

export default Start