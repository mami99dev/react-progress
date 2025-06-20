import { Outlet } from 'react-router-dom'
import SideBar from './sideBar'
import Header from './header'
import './layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <SideBar />
      <div className="main-content">
        <Header />
        <main className="content">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Layout 