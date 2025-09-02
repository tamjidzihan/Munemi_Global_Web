import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { AgentAuthProvider } from './context/AgentAuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AgentAuthProvider>
        <RouterProvider router={router} />
      </AgentAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
