import React, { useContext, useState } from 'react'
import icon from '../assets/icon.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/userContext'
import { SocketContext } from '../context/socketContext'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { updateUser } = useContext(userDataContext)
  const { connectSocket, joinSocket } = useContext(SocketContext)
  const navigate = useNavigate()

  

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
      })

      if (response.status === 200) {
        const data = response.data
        updateUser(data.user)
        localStorage.setItem('token', data.token)
        

        connectSocket()
        joinSocket(data.user._id, 'user')

        navigate('/home')
      }
    } catch (err) {
      console.error('Login failed:', err)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex flex-col justify-between pb-12'>
      <div>
        <img className='w-35 px-5 my-3' src={icon} />
        <form onSubmit={submitHandler} className='px-5'>
          <h3 className='text-2xl px-2 pt-4 pb-3 font-medium'>What's Your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='py-1.5 px-4 bg-[#ededed] w-full rounded-lg placeholder:text-black text-xl focus:outline-none focus:ring-0 focus:border-none'
            placeholder='email@example.com'
            type='email'
            required
          />
          <h3 className='text-2xl px-2 pt-7 pb-3 font-medium'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='py-1.5 px-4 bg-[#ededed] w-full rounded-lg placeholder:text-black text-xl focus:outline-none focus:ring-0 focus:border-none'
            placeholder='Enter Password'
            type='password'
            required
          />
          <button className='mt-7 py-2 px-1 bg-black w-full text-center rounded-lg text-white text-xl font-semibold active:scale-95 transform-3d transition duration-100'>
            Login
          </button>
          <p className='text-center pt-2 text-base'>
            New Here?{' '}
            <Link className='text-sky-600 font-medium' to={'/signup'}>
              Create New User
            </Link>
          </p>
        </form>
      </div>
      <div className='p=5'>
        <Link
          to={'/captain-login'}
          className='inline-block mt-7 ml-4 py-2 px-1 bg-transparent border-3 border-black w-[90%] text-center rounded-lg text-black text-xl font-semibold active:scale-95 transform-3d transition duration-100'>
          Sign in As Captain Instead
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
