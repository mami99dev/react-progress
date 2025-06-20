import { useNavigate } from 'react-router-dom'
import homeIcon from '../../assets/home.svg';
import customersIcon from '../../assets/customers.svg';
import ordersIcon from '../../assets/orders.svg';
import logoutIcon from '../../assets/logout.svg';
import crystalIcon from '../../assets/crystal.svg';
import './sideBar.css'

const SideBar = () => {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={crystalIcon}/>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>Compras</h3>
          <ul>
            <li>
              <button onClick={() => handleNavigation('/')}>
                <span className="icon">
                  <img src={homeIcon}/>
                </span>
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/customers')}>
                <span className="icon">
                  <img src={customersIcon}/>
                </span>
                Clientes
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/orders')}>
                <span className="icon">
                  <img src={ordersIcon}/>
                </span>
                Ordenes
              </button>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3>Otros</h3>
          <ul>
            <li>
              <button onClick={() => handleNavigation('/logout')}>
                <span className="icon">
                  <img src={logoutIcon}/>
                </span>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

export default SideBar 