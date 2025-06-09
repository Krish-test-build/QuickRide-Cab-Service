import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({});
    

    const submitHandler= (e)=>{
        e.preventDefault()
        const data = {
        email,
        password
        };

        setCaptainData(data);
        setEmail('')
        setPassword('')
        
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
                    What's Your Email
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
                <button 
                className=' mt-7 py-2 px-1 bg-black w-full text-center rounded-lg text-white text-xl font-semibold active:scale-95 transform-3d transition duration-100'>
                    Login
                </button>
                <p className='text-center pt-2 text-base  '> Want To Join? <Link className='text-sky-600 font-medium   ' to={'/captain-signup'}>Register As Captain</Link></p>
            </form>
        </div>
        <div className='p=5'>
            <Link 
            to={'/login'} 
            className=' inline-block mt-7 ml-4 py-2 px-1 bg-transparent border-3 border-black w-[90%] text-center rounded-lg text-black text-xl font-semibold active:scale-95 transform-3d transition duration-100'>
                Sign in As User Instead
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin