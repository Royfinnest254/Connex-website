import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './App.jsx'
import './index.css'

document.documentElement.classList.add('js-enabled')

hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter><AppRoutes /></BrowserRouter>
  </React.StrictMode>,
)
