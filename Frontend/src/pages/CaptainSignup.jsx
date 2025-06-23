import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import icon from '../assets/icon.png'
import axios from 'axios'
import { CaptainDataContext } from '../context/captainContext'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleCapacity: '',
    vehicleType: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      fullName: {
        firstName: form.firstName,
        lastName: form.lastName
      },
      email: form.email,
      password: form.password,
      vehicle: {
        color: form.vehicleColor,
        plate: form.vehiclePlate,
        capacity: form.vehicleCapacity,
        vehicleType: form.vehicleType
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      )


      if (response.status === 201 && response.data?.captain?._id) {
        setCaptain(response.data.captain)
        localStorage.setItem('token', response.data.token)
        navigate('/captain-login')
      } else {
        alert('Something went wrong. Captain not created.')
      }
    } catch (err) {
      console.error('❌ Signup failed:', err)
    }

    setForm({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      vehicleColor: '',
      vehiclePlate: '',
      vehicleCapacity: '',
      vehicleType: ''
    })
  }

  return (
    <div className='h-screen flex flex-col justify-between pb-12'>
      <div>
        <img className='w-35 px-5 my-3' src={icon} alt='App Icon' />
        <form onSubmit={submitHandler} className='px-5'>
          <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>What's Your Name Captain</h3>
          <div className='flex gap-4 mb-2'>
            <input
              required name='firstName'
              value={form.firstName}
              onChange={handleChange}
              placeholder='First name'
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg placeholder:text-black text-lg'
            />
            <input
              required name='lastName'
              value={form.lastName}
              onChange={handleChange}
              placeholder='Last name'
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg placeholder:text-black text-lg'
            />
          </div>

          <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>What's Your Email Captain</h3>
          <input
            required name='email'
            value={form.email}
            onChange={handleChange}
            type='email'
            placeholder='email@example.com'
            className='py-1.5 px-4 w-full bg-[#ededed] rounded-lg placeholder:text-black text-xl'
          />

          <h3 className='text-2xl px-2 pt-7 pb-3 font-medium'>Enter Password</h3>
          <input
            required name='password'
            value={form.password}
            onChange={handleChange}
            type='password'
            placeholder='Enter Password'
            className='py-1.5 px-4 w-full bg-[#ededed] rounded-lg placeholder:text-black text-xl'
          />

          <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>Vehicle Information</h3>
          <div className='flex gap-4 mb-2'>
            <input
              required name='vehicleColor'
              value={form.vehicleColor}
              onChange={handleChange}
              placeholder='Vehicle Color'
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg text-lg'
            />
            <input
              required name='vehiclePlate'
              value={form.vehiclePlate}
              onChange={handleChange}
              placeholder='Vehicle Plate'
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg text-lg'
            />
          </div>

          <div className='flex gap-4 mb-2'>
            <input
              required name='vehicleCapacity'
              type='number'
              min='1'
              value={form.vehicleCapacity}
              onChange={handleChange}
              placeholder='Vehicle Capacity'
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg text-lg'
            />
            <select
              required name='vehicleType'
              value={form.vehicleType}
              onChange={handleChange}
              className='py-2 px-4 w-1/2 bg-[#ededed] rounded-lg text-lg'
            >
              <option value='' disabled>Select Vehicle Type</option>
              <option value='car'>Car</option>
              <option value='auto'>Auto</option>
              <option value='bike'>Bike</option>
            </select>
          </div>

          <button
            type='submit'
            className='mt-7 py-2 bg-black w-full text-white text-xl font-semibold rounded-lg active:scale-95 transition duration-100'
          >
            Create Captain
          </button>

          <p className='text-center pt-2 text-base'>
            Already Have an Account? <Link className='text-sky-600 font-medium' to='/captain-login'>Login Here</Link>
          </p>
        </form>
      </div>

      <div className='ml-5 mr-5 text-xs leading-tight'>
        This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.
      </div>
    </div>
  )
}

export default CaptainSignup
      