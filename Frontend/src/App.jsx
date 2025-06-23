import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import { SocketContext } from './context/socketContext.jsx';
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  const { joinSocket } = useContext(SocketContext);

  const handleLogin = (userId, type) => {
      joinSocket(userId, type); // Emit join event after login
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/> 
        <Route path='/login' element={<UserLogin onLogin={handleLogin} />}/>
        <Route path='/riding' element={
          <UserProtectWrapper>
            <Riding />
          </UserProtectWrapper>
        }/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin onLogin={handleLogin} />}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
          }/>
        <Route path='/users/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
          
          } />

          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>
            }/>
            <Route path='/captains/logout' element={
            <CaptainProtectWrapper>
              <CaptainLogout/>
            </CaptainProtectWrapper>
            }/>
            <Route path='/captain-riding' element={
            <CaptainProtectWrapper>
              <CaptainRiding/>
            </CaptainProtectWrapper>
            }/>

      </Routes>
    </div>
  )
}

export default App