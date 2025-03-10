import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Profiles from './Profiles.tsx'
import Reminders from './Reminders.tsx'
import Event from './Events.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <div className='grid-lay'>
      <App />
      <Profiles />
      <Reminders />
      <Event />
  </div>  
    
  </StrictMode>,
)
