import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

export default function Footer(){
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="footer-section">
      <div className="nav-container">
        <a href="home" className="logo">
          <div className="logo-text1">CSW.</div>
          <div className="logo-text2">Collection Sharing Website.</div>
        </a>
        <nav className="nav-menu cl-effect-15">
          <a href="home" data-hover="Home" className="footer-link">Home</a>
          <a href="home#categories" data-hover="Categories" className="footer-link">Categories</a>
          {user ? (
            <>
                <div onClick={logoutUser} data-hover="Logout" className="logout">Logout</div>
            </>
            ) : (
            <>
                <a href="login" data-hover="Login" className="footer-link">Login</a>
                <a href="sign-up" data-hover="Sign up" className="footer-link">Sign up</a>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}
