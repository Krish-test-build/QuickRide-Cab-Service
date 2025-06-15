import React, { useEffect } from 'react'

const WaitForDriver = ({ selectedVehicle = "UberGo", setWaitForDriverPanel, setDriverFoundPanel }) => {
  

  const vehicleImages = {
    UberGo: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png",
    UberAuto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  }

  return (
    <div className="flex flex-col p-4">
      <h3 className='text-3xl font-semibold mb-3.5'>Looking For Nearby Drivers</h3>
      <div className="w-full max-w-md">
        <h4 
          onClick={() => setWaitForDriverPanel(false)}
          className='h-10 w-10 pt-0 mt-0 absolute top-3 right-4.5'
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
          </svg>
        </h4>
        
        <img 
          src={vehicleImages[selectedVehicle]} 
          alt={selectedVehicle}
          className={`${selectedVehicle === 'UberAuto' ? 'ml-5 w-[85%]' : 'w-full'} h-auto my-4 rounded-lg`}
        />
        
        <div className="animate-pulse flex justify-center items-center text-xl font-medium text-gray-600 mt-4">
          Searching for nearby drivers...
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver