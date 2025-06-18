import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MainAction } from './components/actions'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainAction />
  </StrictMode>,
)
