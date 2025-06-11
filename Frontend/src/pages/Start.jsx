import React from 'react'
import uberImg from '../assets/uber_img.jpeg';
import { Link } from 'react-router-dom';




const Start = () => {
  return (
    <div className='flex h-screen w-full justify-between   flex-col'>
        <img className='bg-cover' src={uberImg} alt="" />
        <div className='bg-white py-3 px-5'>
            <h2 className='text-3xl font-semibold '>
                Get Started with Uber
            </h2>
            <Link to={'/login'} className=' inline-block text-center w-full bg-black text-white mt-3 mb-3 p-2 rounded-lg text-xl'>
                Continue
            </Link>
        </div>
    </div>
  )
}

export default Start