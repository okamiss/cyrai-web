import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from '@/layout'
import Home from '@/pages/home'
import Screen from '@/pages/screen'

const Social = lazy(() => import('@/pages/social'))

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>{comp}</React.Suspense>
)

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/social',
        element: withLoadingComponent(<Social />)
      }
    ]
  },
  {
    path: '/screen',
    element: <Screen />
  },
  {
    path: '*',
    element: <Navigate to="/home" />
  }
]

export default routes
