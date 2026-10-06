import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Buscar from './pages/Buscar'
import User from './pages/User'
import './index.css'
import './responsive.css'
import Escanear from './pages/Escanear'
import Sign from './pages/Sign'
import Error from './pages/404'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Error />} />
        <Route path="/crear" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/horarios" element={<Home />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/usuario" element={<User />} />
        <Route path="/escanear" element={<Escanear />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
