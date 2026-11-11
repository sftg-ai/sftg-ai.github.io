import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')
const appTree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, appTree)
} else {
  ReactDOM.createRoot(rootElement).render(appTree)
}
