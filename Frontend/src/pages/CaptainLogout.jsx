import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () =>{
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
            
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/captain-login')
                return
}

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/captains/logout`,
                {
                    headers: {Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
            
        }

        logoutCaptain()
    }, [navigate])

    return (
        <div className="h-screen flex items-center justify-center">
            <p>Logging out...</p>
        </div>
    )
}

export default CaptainLogout