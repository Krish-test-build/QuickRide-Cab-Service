import React from 'react'
import { useNavigate } from 'react-router-dom'

const DriverFound = ({ selectedVehicle, setDriverFoundPanel, setVehiclePanelOpen }) => {
  const navigate = useNavigate()

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

  const handleRideStart = () => {
    setDriverFoundPanel(false)
    navigate('/riding', { state: { selectedVehicle } })
  }

  return (
    <div className="flex flex-col p-4">
      <h4 
        onClick={() => {
          setDriverFoundPanel(false)
          setVehiclePanelOpen(false)
        }}
        className='h-10 w-10 pt-0 mt-0 absolute top-3 right-4.5'
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
        </svg>
      </h4>
      <h3 className='text-3xl font-semibold mb-3.5'>Meet at pickup point</h3>
      
      <div className="flex justify-between items-start mb-4">
        <div className="relative w-32">
          <img 
            src={vehicleImages[selectedVehicle]} 
            alt={selectedVehicle}
            className={`${selectedVehicle === 'UberAuto' ? 'w-[85%] ml-5' : 'w-full'} h-auto rounded-lg`}
          />
          <div className="absolute -right-2 -bottom-2 bg-gray-100 rounded-full p-2">
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

      <input 
        type="text"
        placeholder="Send a Message..."
        className="py-1.5 px-4 bg-[#ededed] w-full rounded-lg placeholder:text-black text-base focus:outline-none focus:ring-0 focus:border-none mb-4"
      />

      <div className="bg-[#f9f9f9] rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
          </svg>
          <span className="text-base">Lorem ipsum dolor sit amet, elit. Hic, necessitatibus?</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-base font-medium">{selectedVehicle}</span>
        <span className="text-xl font-bold">{prices[selectedVehicle]}</span>
      </div>

      <button 
        onClick={handleRideStart} 
        className="w-full bg-black text-white py-3 rounded-lg mt-4 font-medium"
      >
        Start Ride
      </button>
    </div>
  )
}

export default DriverFound