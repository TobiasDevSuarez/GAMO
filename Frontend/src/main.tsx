import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import './index.css'
import './responsive.css'
import Escanear from './pages/Escanear'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/horarios" element={<Home />} />
        <Route path="/buscar" element={<Home />} />
        <Route path="/usuario" element={<Home />} />
        <Route path="/escanear" element={<Escanear />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
