import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './styles/global.scss'

const Home = React.lazy(() => import('./routes/App.jsx'))
// const Admin = React.lazy(() => import('./routes/Admin.jsx'))

createRoot(document.getElementById('root')).render(<Home />)
