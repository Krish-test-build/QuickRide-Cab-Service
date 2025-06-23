import React, { useState, useRef, useEffect,useContext } from 'react'
import axios from 'axios'
import icon from '../assets/icon.png'
import map from '../assets/map.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import WaitForDriver from '../components/WaitForDriver'
import DriverFound from '../components/DriverFound'
import Riding from './Riding'
import { SocketContext } from '../context/socketContext'
import {userDataContext} from '../context/userContext'
import { Navigate, useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickupInput, setPickupInput] = useState('');
  const [pickup, setPickup] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelCloseRef = useRef(null)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [waitForDriverPanel, setWaitForDriverPanel] = useState(false)
  const waitForDriverPanelRef = useRef(null)
  const [driverFoundPanel, setDriverFoundPanel] = useState(false)
  const driverFoundPanelRef = useRef(null)
  const [ridingPanel, setRidingPanel] = useState(false)
  const ridingPanelRef = useRef(null)
  const [activeField, setActiveField] = useState('pickup')
  const [suggestions, setSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const { socket,connectSocket, connected } = useContext(SocketContext)
const { user } = useContext(userDataContext)
const navigate =useNavigate()

useEffect(() => {
  if (!connected) {
    connectSocket();
    return;
  }

  if (!connected || !socket || !user || !user._id) {
    console.log('🔃 Waiting on socket or user');
    return;
  }

  
  socket.emit('join', { userId: user._id, type: 'user' }, () => {
    createRide();
  });
}, [connected, socket, user?._id]);






useEffect(() => {
  if (!socket) return;

  const handleRideConfirmed = (ride) => {
    setDriverFoundPanel(true);
    setSelectedVehicle(ride.vehicleType);
    setWaitForDriverPanel(false);
    setRide(ride);
  };

  socket.on('ride-confirmed', handleRideConfirmed);

  return () => {
    socket.off('ride-confirmed', handleRideConfirmed);
  }; 
}, [socket]);
useEffect(() => {
  if (!socket) return;

  const handleRideStarted = (ride) => {
    setWaitForDriverPanel(false);
    navigate('/riding', {
      state: {
        ride: ride,
        fare,
      },
    });
  };

  socket.on('ride-started', handleRideStarted);

  return () => {
    socket.off('ride-started', handleRideStarted);
  };
}, [socket, navigate, fare]);


  const SubmitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : '0%'
    }), gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)'
    }), gsap.to(vehiclePanelCloseRef.current, {
      opacity: vehiclePanelOpen ? 1 : 0
    })
  }, [vehiclePanelOpen, panelOpen])

 

  useGSAP(() => {
    gsap.to(waitForDriverPanelRef.current, {
      transform: waitForDriverPanel ? 'translateY(0)' : 'translateY(100%)',
      paddingTop: waitForDriverPanel ? '0px' : '10px',
      opacity: waitForDriverPanel ? 1 : 0
    })
  }, [waitForDriverPanel])

  useGSAP(() => {
    gsap.to(driverFoundPanelRef.current, {
      transform: driverFoundPanel ? 'translateY(0)' : 'translateY(100%)',
      paddingTop: driverFoundPanel ? '0px' : '10px',
      opacity: driverFoundPanel ? 1 : 0

    })
  }, [driverFoundPanel])

  useGSAP(() => {
    gsap.to(ridingPanelRef.current, {
      transform: ridingPanel ? 'translateY(0)' : 'translateY(100%)'
    })
  }, [ridingPanel])

  useEffect(() => {
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      if (!pickupInput.trim()) {
        setSuggestions([]);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(pickupInput)}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            signal: controller.signal
          });

          const suggestionList = response.data.map(item => item.display_name);
          setSuggestions(suggestionList);
          setActiveField('pickup');
          setPanelOpen(true);
        } catch (error) {
          if (!axios.isCancel(error)) console.error("Error fetching pickup suggestions:", error);
        }
      };

      fetchSuggestions();
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [pickupInput]);

  useEffect(() => {
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      if (!destinationInput.trim()) {
        setSuggestions([]);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(destinationInput)}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            signal: controller.signal
          });

          const suggestionList = response.data.map(item => item.display_name);
          setSuggestions(suggestionList);
          setActiveField('destination');
          setPanelOpen(true);
        } catch (error) {
          if (!axios.isCancel(error)) console.error("Error fetching destination suggestions:", error);
        }
      };

      fetchSuggestions();
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [destinationInput]);

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
      setPickupInput(suggestion);
    } else {
      setDestination(suggestion);
      setDestinationInput(suggestion);
    }
    
  }

async function FindTrip() {
  if (!pickup || !destination) {
    alert("Please enter both pickup and destination locations.");
    return;
  }

  setPanelOpen(false);
  setVehiclePanelOpen(true);
  setActiveField('vehicle');
  setPickupInput('');
  setDestinationInput('');
  setSuggestions([]);

  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setFare(response.data);
  } catch (error) {
    console.error("Error fetching fare:", error.response?.data || error.message);
  }
}

async function createRide(vehicleType) {

    const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ); 
      
      
    
  };

 return (
  <div>
    <img className="w-30 h-auto left-5 mt-2 absolute z-[50]" src={icon} />
    <div>
      {/* Map */}
      <div className="w-screen z-0 h-[570px] relative">
        <LiveTracking />
      </div>

      {/* Overlay UI Panels (Form + Search Panel) */}
      <div className="absolute top-0 h-screen w-full z-[50] pointer-events-none">
        <div className="flex flex-col justify-end w-full h-full overflow-hidden">
          {/* Form Panel */}
          <div
            className="rounded-t-xl h-[26%] px-5 py-6 bg-white relative z-10"
            style={{ pointerEvents: 'auto' }}
          >
            <h4
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="h-10 w-10 pt-0 mt-0 absolute top-3 right-4.5 opacity-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
              </svg>
            </h4>
            <h4 className="text-3xl font-semibold mb-3">Find a trip</h4>

            <form onSubmit={SubmitHandler}>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-transparent outline-4 outline-black top-22.5 left-8.5"></div>
              <div className="line absolute h-10.5  w-1 top-24 left-8.5 bg-black"></div>
              <div className="absolute w-1.5 h-1.5 bg-transparent outline-4 outline-black top-35 left-8.5"></div>

              <input
                onClick={() => setPanelOpen(true)}
                value={pickupInput}
                onChange={(e) => setPickupInput(e.target.value)}
                className="py-1 px-9 bg-[#ededed] w-full rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                type="text"
                placeholder="Add a Pickup Location"
              />
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField('destination');
                }}
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="py-1 mt-4 px-9 bg-[#ededed] w-full rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                type="text"
                placeholder="What's Your Destination"
              />
            </form>

            <button
              onClick={FindTrip}
              className="flex justify-center items-center w-full border-3 bg-black text-white py-1.5 rounded-lg mt-2 font-semibold text-lg"
            >
              Find Trip
            </button>
          </div>

          {/* Location Suggestions */}
          <div
            ref={panelRef}
            className="pt-8 h-0 bg-white overflow-auto"
            style={{ pointerEvents: 'auto' }}
          >
            <LocationSearchPanel
              suggestions={suggestions}
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPanelOpen={setPanelOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>

      {/* Bottom Slide Panels */}
      <div ref={vehiclePanelRef} className="fixed w-full z-[60] bottom-0 translate-y-full bg-white p-3 rounded-t-xl">
        <VehiclePanel
          createRide={createRide}
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setWaitForDriverPanel={setWaitForDriverPanel}
          vehiclePanelCloseRef={vehiclePanelCloseRef}
        />
      </div>

      <div ref={waitForDriverPanelRef} className="fixed w-full z-[60] -bottom-2 translate-y-full bg-white p-3 rounded-t-xl">
        <WaitForDriver
          fare={fare}
          pickup={pickup}
          selectedVehicle={selectedVehicle}
          setVehicleType={setVehicleType}
          vehicleType={vehicleType}
          setWaitForDriverPanel={setWaitForDriverPanel}
          setDriverFoundPanel={setDriverFoundPanel}
        />
      </div>

      <div ref={driverFoundPanelRef} className="fixed w-full z-[60] -bottom-2 translate-y-full bg-white p-3 rounded-t-xl">
        <DriverFound
          selectedVehicle={selectedVehicle}
          setVehicleType={setVehicleType}
          vehicleType={vehicleType}
          fare={fare}
          setDriverFoundPanel={setDriverFoundPanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          ride={ride}
        />
      </div>

      <div ref={ridingPanelRef} className="fixed w-full z-[60] bottom-0 translate-y-full bg-white p-3 rounded-t-xl">
        <Riding
          ride={ride}
          fare={fare}
          setRidingPanel={setRidingPanel}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />
      </div>
    </div>
  </div>
);

}

export default Home