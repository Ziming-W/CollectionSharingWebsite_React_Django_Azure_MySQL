// import React from "react";

import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
  

  
export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="nav-section">
            <div className="nav-container">
                <a href="home" className = "logo" onClick={() => navigate("/home")}>
                    <div className="logo-text1">CSW.</div>
                    <div className="logo-text2">Collection Sharing Website.</div>
                </a>
                <nav className="nav-menu cl-effect-15">
                    <a href="home" data-hover="Home" className="nav-link" onClick={() => navigate("/home")}>Home</a>
                    <a href={"home#categories"} data-hover="Categories" className="nav-link" onClick={() => navigate("/home#categories")}>Categories</a>
                     {user ? (
                        <>
                            <a href='history-post' 
                                // data-hover={" " + user.username} 
                                className="nav-link" 
                                onClick={() => navigate("/history-post")}
                            >
                                <div className="nav-pic">
                                    {user.username[0]}
                                </div>
                                <div className='nav-username'>{" " + user.username}</div>
                            </a>
                            
                            <div onClick={logoutUser} className="logout">Logout</div>
                        </>
                        ) : (
                        <>
                            <a href="login" data-hover="Login" className="nav-link" onClick={() => navigate("/login")}>Login</a>
                            <a href="sign-up" data-hover="Sign up" className="nav-link" onClick={() => navigate("/sign-up")}>Sign up</a>
                        </>
                        )}

                </nav>
            </div>
        </div>
    )
}