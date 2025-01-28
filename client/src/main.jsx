import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Poem from './Poems/PoemCard.jsx'
import Users from './Users.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
    <Poem /> */}
    <Users/>
  </StrictMode>,
)
