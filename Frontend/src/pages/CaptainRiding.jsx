import React, { useRef, useState } from 'react'
import map from '../assets/map.png'
import icon from '../assets/icon.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(()=>{
      gsap.to(finishRidePanelRef.current, {
        transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)'
      })
    },[finishRidePanel])
  return (
    <div className="h-screen ">
        <div className='w-full flex  justify-between'>
            <Link to={'/captain-home'} className='absolute h-11 w-11 top-3 right-3 m-3 bg-[#ededed] rounded-full'>
                <svg className='h-8 w-8 mt-1.5 ml-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path></svg>
            </Link>
            <img className='w-30 left-5 -top-3 absolute' src={icon} />
        </div>
      
      <img className='w-screen h-[570px]' src={map} alt="" />
      
      <div className='flex flex-col justify-end absolute bottom-0 w-full h-1/4 bg-yellow-500 rounded-t-2xl'
      onClick={()=>{
        setFinishRidePanel(true)
      }}
      >
      <svg className='w-15 h-15 self-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8.36853L20.9679 13.1162L20.0321 14.8838L12 10.6315L3.96789 14.8838L3.03211 13.1162L12 8.36853Z"></path></svg>
        <div className='inline-flex justify-between  items-center px-3 h-full pb-5'>
            <h4 className='font-semibold text-2xl '>4KM Away</h4>
            <button className=" active:scale-90 ease-in-out w-1/2 border-3 border-black bg-green-600 text-xl text-black py-3 rounded-lg mt-4 font-semibold ">
                Complete ride
            </button>
        </div>
      </div>
       <div ref={finishRidePanelRef}  className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
         <FinishRide setFinishRidePanel={setFinishRidePanel}/> 
         </div>
      </div>
    )
}

export default CaptainRiding