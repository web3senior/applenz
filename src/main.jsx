import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.scss'
import './styles/global.scss'

const Home = React.lazy(() => import('./routes/Home.jsx'))
const Admin = React.lazy(() => import('./routes/Admin.jsx'))

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path={`admin`} element={<Admin />} />
    </Routes>
  </BrowserRouter>
)
