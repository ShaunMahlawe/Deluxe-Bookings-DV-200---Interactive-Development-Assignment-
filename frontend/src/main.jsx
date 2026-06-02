import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AppRouter from './AppRouter.jsx'

import { AuthProvider } from './context/authContext' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>
)
