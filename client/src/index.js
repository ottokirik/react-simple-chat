import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components'
import CssBaseline from '@mui/material/CssBaseline'
import { RecoilRoot } from 'recoil'
import { SocketProvider } from './context/socket-provider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CssBaseline />

    <RecoilRoot>
      <SocketProvider>
        <App />
      </SocketProvider>
    </RecoilRoot>
  </React.StrictMode>
)
