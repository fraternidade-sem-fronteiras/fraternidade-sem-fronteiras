import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

const SuspenseFallback = React.lazy(() => import('#resources/js/SuspenseFallback'))
const Routes = React.lazy(() => import('#resources/js/routes'))

const container = document.getElementById('root')
const API_URL = container.getAttribute('env')

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Suspense fallback={<SuspenseFallback />}>
      <Routes env={JSON.parse(API_URL.substring(0, API_URL.length - 1))} />
    </Suspense>
  </React.StrictMode>
)
