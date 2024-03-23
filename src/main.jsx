import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root'))

root.render(
  <Auth0Provider
    domain="dev-f5rw4k1kqjxemglt.us.auth0.com"
    clientId="auCnFStgTFuxrGi8OgdhHSRGEdkVjsOn"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation={'localstorage'}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
)
