import { lazy } from 'react'

const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const DashboardRoutes = [
  {
    path: '/researcher',
    element: <DashboardEcommerce />
  }
]

export default DashboardRoutes
