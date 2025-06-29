import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context/userContext.jsx'
import CaptainContext from './context/captainContext.jsx'
import SocketProvider from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <UserContext>         
      <CaptainContext>    
        <SocketProvider>  
          <App />
        </SocketProvider>
      </CaptainContext>
    </UserContext>
  </BrowserRouter>
</StrictMode>

)
