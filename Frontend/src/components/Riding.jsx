import React from 'react'
import map from '../assets/map.png'
import icon from '../assets/icon.png'
import { Link } from 'react-router-dom'

const Riding = ({ selectedVehicle }) => {
  const vehicleImages = {
    UberGo: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png",
    UberAuto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  }

  const prices = {
    UberGo: "₹193.20",
    Moto: "₹65.17",
    UberAuto: "₹118.21"
  }

  return (
    
    <div className="h-screen relative">
        <div>
            <Link to={'/home'} className='absolute h-11 w-11 top-3 right-4 m-3 bg-[#ededed] rounded-full'>
                <svg className='h-8 w-8 mt-1.5 ml-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19Z"></path></svg>
            </Link>
        </div>
      <img className='w-30 left-5 mt-0 absolute' src={icon} />
      <img className='w-screen h-[570px]' src={map} alt="" />
      
      <div className='flex flex-col justify-end absolute bottom-0 w-full'>
        <div className='bg-white p-4 rounded-t-xl'>
          <div className="w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <div className="relative w-32 h-24">
                <img 
                  src={vehicleImages[selectedVehicle]} 
                  alt={selectedVehicle}
                  className={`${selectedVehicle === 'UberAuto' ? 'w-[85%] ml-5' : 'w-full'} h-auto rounded-lg`}
                />
                <div className="absolute -right-2 bottom-0 bg-gray-100 rounded-full p-2">
                  <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13Z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-base">Rajesh Kumar</span>
                <span className="text-2xl font-semibold">KA 01 AB 1234</span>
                <span className="text-base">Honda City</span>
                <span className="text-sm">4.9 ★</span>
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
                </svg>
                <span className="text-base">Lorem ipsum dolor sit amet, elit. Hic, necessitatibus?</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg font-medium">
              Make a Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riding