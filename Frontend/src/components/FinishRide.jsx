import React, { useRef, useState } from 'react'
import map from '../assets/map.png'
import icon from '../assets/icon.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'


const FinishRide = (props) => {


    
  return (
    <div className='h-screen flex flex-col justify-between align-middle '>
            <div className="flex flex-col p-4 justify-between ">
          <h3 className='text-3xl font-semibold mb-10 mt-5'>Finish Ride </h3>
          <div className="w-full max-w-md ">
            <h4 
              
              className='h-10 w-10 pt-0 mt-0 absolute top-9 right-4.5'
            >
              <svg onClick={()=>{
                props.setFinishRidePanel(false)
              }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
              </svg>
            </h4>
            
            
            <div className="bg-[#f9f9f9] rounded-xl p-4 mb-12">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
                </svg>
                <span className="text-xl font-medium">Selected Location</span>
              </div>
              <p className="text-gray-600 text-lg">Lorem ipsum dolor sit amet, elit. Hic, necessitatibus?</p>
            </div>
    
            <div className="bg-[#f9f9f9] rounded-xl p-4 mb-12 ">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold">UberGo</h3>
                  <p className="text-gray-600">Reached Destination</p>
                </div>
                
                <span className="text-xl font-bold inline-flex "> <svg className=' w-7 h-6 ml-3 mt-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0004 16C14.2095 16 16.0004 14.2091 16.0004 12 16.0004 9.79086 14.2095 8 12.0004 8 9.79123 8 8.00037 9.79086 8.00037 12 8.00037 14.2091 9.79123 16 12.0004 16ZM21.0049 4.00293H3.00488C2.4526 4.00293 2.00488 4.45064 2.00488 5.00293V19.0029C2.00488 19.5552 2.4526 20.0029 3.00488 20.0029H21.0049C21.5572 20.0029 22.0049 19.5552 22.0049 19.0029V5.00293C22.0049 4.45064 21.5572 4.00293 21.0049 4.00293ZM4.00488 15.6463V8.35371C5.13065 8.017 6.01836 7.12892 6.35455 6.00293H17.6462C17.9833 7.13193 18.8748 8.02175 20.0049 8.3564V15.6436C18.8729 15.9788 17.9802 16.8711 17.6444 18.0029H6.3563C6.02144 16.8742 5.13261 15.9836 4.00488 15.6463Z"></path></svg> ₹193.20</span>
              </div>
            </div>
    
            <div className='flex flex-col gap-3'>
                
                <Link 
                to={'/captain-riding'}
                className="flex flex-col items-center w-full border-3 border-black text-black py-1 rounded-lg mt-3 font-semibold text-lg "
                >
                    <svg className='h-10 w-10 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
                Complete Ride
                </Link>
    
                
            
            </div>
          </div>
        </div>
        </div>
  )
}

export default FinishRide