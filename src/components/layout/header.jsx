import userLogo from './../../assets/user.svg'
import notificationsLogo from './../../assets/notifications.svg'
import './header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="user-info">
          <div className="user-avatar">
            <img src={userLogo} />
          </div>
          <div className="user-details">
            <span className="user-name">Isaac Martínez</span>
            <span className="user-role">Administrador</span>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        <button className="notification-btn">
          <img src={notificationsLogo} />
        </button>
      </div>
    </header>
  )
}

export default Header 