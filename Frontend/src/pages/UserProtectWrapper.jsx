import React,{useContext,useEffect,useState} from 'react'
import {userDataContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const UserProtectWrapper = ({children}) => {
    const token=localStorage.getItem('token')
    const navigate=useNavigate()

    const { setUser } = React.useContext(userDataContext)
    const [isLoading,setIsLoading ] =useState(true)

    useEffect(() => {
      if(!token){
        navigate('/login')
    }
    
    }, [token,navigate])
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        if(response.status===200){
            setUser(response.data.user)
            setIsLoading(false)
        }
    }).catch(err=>{
        localStorage.removeItem('token')
        navigate('/login')
})
    if(isLoading){
            return(
                <div>Loading....</div>
            )
        }
    return <>{children}</>;
};


export default UserProtectWrapper