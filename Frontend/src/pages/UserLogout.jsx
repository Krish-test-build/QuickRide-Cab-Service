import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const logoutUser = async () => {
            
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                return
}

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/users/logout`,
                {
                    headers: {                            Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/login')
            }
            
        }

        logoutUser()
    }, [navigate])

    return (
        <div className="h-screen flex items-center justify-center">
            <p>Logging out...</p>
        </div>
    )
}

export default UserLogout