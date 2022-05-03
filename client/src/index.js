import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import CssBaseline from '@mui/material/CssBaseline'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CssBaseline />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
