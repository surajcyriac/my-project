import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './context/Contextapi.jsx'
import Authcontext from './context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authcontext>
  <Contextapi>
    <BrowserRouter>
          <App />
      
    </BrowserRouter> 
  </Contextapi>
</Authcontext>
  </StrictMode>,
)
