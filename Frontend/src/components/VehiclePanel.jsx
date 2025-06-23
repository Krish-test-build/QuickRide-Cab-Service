import React from 'react'

const VehiclePanel = (props) => {
  return (
        <div className=" bottom-0 left-0 w-full bg-white p-4 z-[100] rounded-t-xl shadow-xl">

            <h4 ref={props.vehiclePanelCloseRef} 
                onClick={() => {
                    props.setVehiclePanelOpen(false); 
                }} 
                className='h-10 w-10 pt-0 mt-0 absolute top-3 right-4.5 opacity-0'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
            </h4>
                <h3 className='text-3xl font-semibold mb-3.5'>Choose A Vehicle</h3>
                <div onClick={() => {
                    props.createRide('car');
                    props.setVehicleType('car');
                    props.setVehiclePanelOpen(false);
                    props.setWaitForDriverPanel(true); 
                }} className='mb-2 flex bg-[#f9f9f9] border-3 border-white  active:border-black rounded-xl w-full py-3 items-center justify-between'>
                    <img className='h-13 mb-2 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"/>
                    <div className='w-1/2'>
                    <h4 className=' font-medium text-lg'>QuickGo <span ><svg className='w-3.5 h-3.5 inline-flex align-baseline mr-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path></svg>3</span></h4>
                    <h5 className=' font-medium text-base'>2 mins away </h5>
                    <p className=' font-normal text-xs text-gray-600'>Affordable, compact</p>
                    </div>
                    <h2 className='text-xl font-semibold p-3'>₹{props.fare.car}</h2>
                </div>
                <div onClick={() => {
                    props.createRide('bike');
                    props.setVehicleType('bike');
                    props.setVehiclePanelOpen(false);
                    props.setWaitForDriverPanel(true);
                }} className='mb-2 flex bg-[#f9f9f9] border-3 border-white  active:border-black rounded-xl w-full py-3 items-center justify-between px-0'>
                    <img className='h-14 w-auto mb-2 mt-2 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"/>
                    <div className='w-1/2'>
                    <h4 className='-ml-2 font-medium text-lg'>Moto <span><svg className='w-3.5 h-3.5 inline-flex align-baseline mr-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path></svg>1</span></h4>
                    <h5 className='-ml-2 font-medium text-base'>3 mins away </h5>
                    <p className='-ml-2 font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                    </div>
                    <h2 className='text-xl font-semibold p-3'>₹{props.fare.bike}</h2>
                </div>
                <div onClick={() => {
                    props.createRide('auto');
                    props.setVehicleType('auto');
                    props.setVehiclePanelOpen(false);
                    props.setWaitForDriverPanel(true);
                }} className='mb-2 flex bg-[#f9f9f9] border-3 border-white  active:border-black rounded-xl w-full py-3 items-center justify-between px-0'>
                    <img className='h-12 w-auto mb-2 px-2 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"/>
                    <div className='w-1/2'>
                    <h4 className=' font-medium text-lg'>UberAuto <span><svg className='w-3.5 h-3.5 inline-flex align-baseline mr-0.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path></svg>3</span></h4>
                    <h5 className=' font-medium text-base'>2 mins away </h5>
                    <p className=' font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                    </div>
                    <h2 className='text-xl font-semibold p-3'>₹{props.fare.auto}</h2>
                </div>
              </div>
  )
}

export default VehiclePanel