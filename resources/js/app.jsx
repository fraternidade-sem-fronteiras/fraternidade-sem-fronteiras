import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '../../src/_app'

const container = document.getElementById('root')
const API_URL = container.getAttribute('env')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App env={JSON.parse(API_URL.substring(0, API_URL.length - 1))}/>
  </React.StrictMode>
)
