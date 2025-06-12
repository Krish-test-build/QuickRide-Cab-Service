import React from 'react'
import icon from '../assets/icon.png'
import map from '../assets/map.png'
import { useState } from 'react'
import  { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitForDriver from '../components/WaitForDriver'
import DriverFound from '../components/DriverFound'
import Riding from '../components/Riding'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelCloseRef=useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState("UberGo")
  const [waitForDriverPanel, setWaitForDriverPanel] = useState(false)
  const waitForDriverPanelRef = useRef(null)
  const [driverFoundPanel, setDriverFoundPanel] = useState(false)
  const driverFoundPanelRef = useRef(null)
  const [ridingPanel, setRidingPanel] = useState(false)
  const ridingPanelRef = useRef(null)
    
  const SubmitHandler=(e)=>{
    e.preventDefault()
    
  }
  
  useGSAP(() => {
  gsap.to(panelRef.current, {
    height: panelOpen ? '70%' : '0%'

  }),gsap.to(panelCloseRef.current, {
    opacity: panelOpen ? 1 : 0
  });

}, [panelOpen]);

useGSAP(()=>{
  gsap.to(vehiclePanelRef.current, {
    transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)'


  }),gsap.to(vehiclePanelCloseRef.current, {
    opacity: vehiclePanelOpen ? 1: 0
  })

},[vehiclePanelOpen,panelOpen])

useGSAP(()=>{
  gsap.to(confirmRidePanelRef.current, {
    transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)'


  })

},[confirmRidePanel])

useGSAP(() => {
    gsap.to(waitForDriverPanelRef.current, {
      transform: waitForDriverPanel ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [waitForDriverPanel])

  useGSAP(() => {
    gsap.to(driverFoundPanelRef.current, {
      transform: driverFoundPanel ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [driverFoundPanel])

  useGSAP(() => {
    gsap.to(ridingPanelRef.current, {
      transform: ridingPanel ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [ridingPanel])

  return (
    <div>
        <img className='w-30  left-5 mt-0 absolute'src={icon} />
        <div >
          {/* Temp Img */}
          <img className='w-screen  h-[570px]' src={map} alt="" />
          <div className=' flex flex-col justify-end absolute top-0 h-screen w-full overflow-hidden '>
              <div className=' rounded-t-xl h-[26%] px-5 py-8 bg-white relative'>
                <h4 ref={panelCloseRef} onClick={()=>{
                  setPanelOpen(false)
                }} className='h-10 w-10 pt-0 mt-0 absolute top-3 right-4.5 opacity-0'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg></h4>
                <h4 className='text-3xl font-semibold mb-3.5'>Find a trip</h4>
              <form  onSubmit={(e)=>{
                SubmitHandler(e)
                
              }}>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-transparent outline-4 outline-black top-24.5 left-8.5"></div>

                <div className="line absolute h-10.5  w-1 top-26 left-8.5    bg-black"></div>
                <div className="absolute w-1.5 h-1.5  bg-transparent outline-4 outline-black top-37 left-8.5"></div>
                <input 
                onClick={()=>{
                  setPanelOpen(true)
                }}
                value={pickup}
                onChange={(e)=>{
                  setPickup(e.target.value)
                }}
                className='py-1 px-9 bg-[#ededed] w-full  rounded-lg placeholder:text-black  text-lg  focus:outline-none focus:ring-0 focus:border-none' 
                type="text" 
                placeholder='Add a Pickup Location' />
                <input
                onClick={()=>{
                  setPanelOpen(true)
                }}
                value={destination}
                onChange={(e)=>{
                  setDestination(e.target.value)
                }}
                className='py-1 mt-4 px-9 bg-[#ededed] w-full  rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none' 
                type="text" 
                placeholder="What's Your Destination "/>
              </form>
              </div>
            <div ref={panelRef} className='h-0 bg-white  '>
                  <LocationSearchPanel  setVehiclePanelOpen={setVehiclePanelOpen}  setPanelOpen={setPanelOpen}/>
            </div>
          </div>
          <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
            <VehiclePanel 
              setSelectedVehicle={setSelectedVehicle}
              setConfirmRidePanel={setConfirmRidePanel} 
              setVehiclePanelOpen={setVehiclePanelOpen}
              vehiclePanelCloseRef={vehiclePanelCloseRef}
            />  
          </div>
          <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
            <ConfirmRide
              selectedVehicle={selectedVehicle}
              setConfirmRidePanel={setConfirmRidePanel}
              setWaitForDriverPanel={setWaitForDriverPanel}
            />
          </div>
          <div ref={waitForDriverPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
            <WaitForDriver
              selectedVehicle={selectedVehicle}
              setWaitForDriverPanel={setWaitForDriverPanel}
              setDriverFoundPanel={setDriverFoundPanel}
            />
          </div>
          <div ref={driverFoundPanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
            <DriverFound
              selectedVehicle={selectedVehicle}
              setDriverFoundPanel={setDriverFoundPanel}
              setVehiclePanelOpen={setVehiclePanelOpen}
            />
          </div>  
          <div ref={ridingPanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
            <Riding
              selectedVehicle={selectedVehicle}
              setRidingPanel={setRidingPanel}
            />
          </div>
        </div>
      </div>
  )
}

export default Home