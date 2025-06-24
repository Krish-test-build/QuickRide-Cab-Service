import React, { useRef, useState,useEffect,useContext } from 'react'
import map from '../assets/map.png'
import icon from '../assets/icon.png'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { SocketContext } from '../context/socketContext'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'



const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const RidePopupPanelRef = useRef(null)
   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ConfirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)
  const [myVehicle, setMyVehicle] = useState(null)

  const { socket, connectSocket, connected } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

useEffect(() => {
  if (!connected) {
    connectSocket();
    return;
  }

  if (!socket || !captain || !captain._id) {
    return;
  }

  socket.emit('join', {
    userId: captain._id,
    type: 'captain',
  });

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: latitude,
              long: longitude,
            },
          });
        },
        (error) => {
          console.error('❌ Failed to get location:', error);
        }
      );
    }
  };
  

  

  updateLocation();
  const interval = setInterval(updateLocation, 10000);
  return () => clearInterval(interval);
}, [connected, captain?._id]);

  if (socket) {
    socket.on('new-ride-request', (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });
  }
    useEffect(() => {
  if (captain?.vehicle?.vehicleType) {
    setMyVehicle(captain.vehicle.vehicleType);
  }
}, [captain]);

  async function confirmRide() {
    console.log(`${import.meta.env.VITE_BASE_URL}/rides/confirm`);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        
      }
    });
  }

  useGSAP(()=>{
  gsap.to(RidePopupPanelRef.current, {
    transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
  })
},[ridePopupPanel])

useGSAP(()=>{
  gsap.to(ConfirmRidePopupPanelRef.current, {
    transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
  })
},[confirmRidePopupPanel])




  const vehicleImages = {
    QuickGo: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
    Moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png",
    UberAuto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  }

  
  return (
    <div className="h-screen ">
        <div className='w-full flex  justify-between z-[50]'>
            <Link to={'/captain-home'} className=' z-[50] absolute h-11 w-11 top-3 right-3 m-3 bg-[#ededed] rounded-full'>
                <svg className='z-[50] h-8 w-8 mt-1.5 ml-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path></svg>
            </Link>
            <img className='w-30 h-auto left-5 top-3 absolute z-[60]' src={icon} />
        </div>
      <div className='w-screen h-[570px]'>
      <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end absolute bottom-0 w-full'>
        <CaptainDetails
        captain={captain}
        />
      </div>
      <div ref={RidePopupPanelRef}  className='fixed w-full bottom-0  translate-y-full bg-white p-3 rounded-t-xl z-[60]'>
         <RidePopup 
         ride={ride}
         myVehicle={myVehicle}
         setRidePopupPanel={setRidePopupPanel}
         confirmRide={confirmRide}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>   
      </div>
      <div ref={ConfirmRidePopupPanelRef}  className='fixed w-full z-[60] bottom-0 translate-y-full bg-white p-3 rounded-t-xl'>
         <ConfirmRidePopup
         ride={ride}
         myVehicle={myVehicle}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />   
      </div>
    </div>
  )
}

export default CaptainHome