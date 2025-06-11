import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate=useNavigate()

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const {captain,setCaptain}=React.useContext(CaptainDataContext)
    

    const submitHandler= async (e)=>{
        e.preventDefault()
        const captainData = {
          fullName: {
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

        if(response.status==201){
            const data=response.data
            setCaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-login')
        }
        
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
        
    }
  return (
    <div className='h-screen flex flex-col justify-between pb-12' >
        <div>
            <img 
            className='w-30 px-5 mt-0' 
            src="https://images.seeklogo.com/logo-png/33/1/uber-logo-png_seeklogo-338872.png"  />
            <form onSubmit={(e)=>{
                submitHandler(e)}}
            className='px-5'>
                <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>
                    What's Your Name Captain
                    </h3>
            <div className='flex gap-4 mb-2'>
              <input
                required
                className='py-2 px-4 w-1/2 bg-[#ededed]  rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='py-2 px-4 w-1/2 bg-[#ededed]  rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
                <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>
                    What's Your Email Captain
                    </h3>
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                className=' py-1.5 px-4 bg-[#ededed] w-full  rounded-lg placeholder:text-black text-xl focus:outline-none focus:ring-0 focus:border-none' 
                placeholder='email@example.com' 
                type="email" 
                required
                />
                <h3 
                className='text-2xl px-2 pt-7 pb-3 font-medium'>
                    Enter Password
                </h3>
                <input 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                className=' py-1.5 px-4 bg-[#ededed] w-full   rounded-lg placeholder:text-black text-xl focus:outline-none focus:ring-0 focus:border-none' 
                placeholder='Enter Password' 
                type="password" 
                required
                />
                <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>
                    Vehicle information
                    </h3>
                <div className="flex gap-4 mb-2">
                    <input
                        required
                        className="py-2 px-4 w-1/2 bg-[#ededed] rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                        type="text"
                        placeholder="Vehicle Color"
                        value={vehicleColor}
                        onChange={e => setVehicleColor(e.target.value)}
                    />
                    <input
                        required
                        className="py-2 px-4 w-1/2 bg-[#ededed] rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                        type="text"
                        placeholder="Vehicle Plate"
                        value={vehiclePlate}
                        onChange={e => setVehiclePlate(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 mb-2">
                    <input
                        required
                        className="py-2 px-4 w-1/2 bg-[#ededed] rounded-lg placeholder:text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                        type="number"
                        min="1"
                        placeholder="Vehicle Capacity"
                        value={vehicleCapacity}
                        onChange={e => setVehicleCapacity(e.target.value)}
                    />
                    <select
                        required
                        className="py-2 px-4 w-1/2 bg-[#ededed] rounded-lg text-black text-lg focus:outline-none focus:ring-0 focus:border-none"
                        value={vehicleType}
                        onChange={e => setVehicleType(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Vehicle Type
                        </option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="bike">Bike</option>
                    </select>
                </div>
                <button 
                className=' mt-7 py-2 px-1 bg-black w-full text-center rounded-lg text-white text-xl font-semibold active:scale-95 transform-3d transition duration-100'>
                    Create Captain
                </button>
                <p className='text-center pt-2 text-base  '> Already Have an Account? <Link className='text-sky-600 font-medium   ' to={'/captain-login'}>Login Here</Link></p>
            </form>
        </div>
        <div className='ml-5 mr-5'>
            
          <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        
        </div>
    </div>
  )
}

export default CaptainSignup