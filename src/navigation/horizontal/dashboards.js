// ** Icons Import
import { Home, Search } from 'react-feather'
// eslint-disable-next-line no-duplicate-imports

export default [
  {
    id: 'dashboards',
    title: 'داشبورد',
    icon: <Home />,
    navLink: '/dashboard'
  },
  {
    id: 'dashboards',
    title: 'کاوشگر',
    icon: <Search />,
    navLink: '/researcher'
  },
  {
    id: 'dashboards',
    title: 'ردیابی',
    icon: <Search />,
    navLink: '/tracker/:address'
  },
  {
    id: 'dashboards',
    title: 'استخراج',
    icon: <Home />,
    navLink: '/dashboard3'
  },
  {
    id: 'dashboards',
    title: 'مالیات',
    icon: <Search/>,
    navLink: '/dashboard4'
  },
  {
    id: 'dashboards',
    title: 'گزارش',
    icon: <Home />,
    navLink: '/dashboard5'
  }
  
]
