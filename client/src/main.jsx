import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Poem from './Poems/PoemCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Poem />
  </StrictMode>,
)
