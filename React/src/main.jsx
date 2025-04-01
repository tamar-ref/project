import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from './assets/features/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*{localStorage.removeItem('user')}*/}
    <App />
  </StrictMode>,
)
createRoot(document.getElementById('footer')).render(<Footer />);

