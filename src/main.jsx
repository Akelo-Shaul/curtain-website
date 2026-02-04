import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ServicePage from './pages/ServicePage.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/services/:serviceId" element={<ServicePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
