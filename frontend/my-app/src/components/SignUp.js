import AuthContext from "../context/AuthContext";
import React, { useState, useContext } from "react";
import PasswordMeter from "./PasswordMeter";

export default function Sign_Up() {
    console.log(useContext(AuthContext))

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { registerUser } = useContext(AuthContext);

     const handleSubmit = async e => {
     e.preventDefault();
        registerUser(username, password, password2);
    };


    return (
        <div className='authentication-form-container' id="signup">
            <div className='sign-up-background' />
            <form className='form' onSubmit={handleSubmit}>
            <h1 className="signUp">Sign up</h1>
                <input
                    type = "text"
                    placeholder = "Username"
                    className='form--input'
                    onChange={e => setUsername(e.target.value)}
                    name = "username"
                    maxLength = "30"
                />
                <input
                    type = "password"
                    placeholder = "Password"
                    className='form--password'
                    onChange={e => setPassword(e.target.value)}
                    name = "password"
                    maxLength = "30"
                />
                 <PasswordMeter password={password} />
                 <div className="password--hint" id= "requirement">
                    *Use 8 or more characters with a mix of letters, numbers and symbols
                </div>
                <input
                    type = "password"
                    placeholder = "Confirm Password"
                    className='form--confirm--password'
                    onChange={e => setPassword2(e.target.value)}
                    name = "confirmPassword"
                    maxLength = "30"
                />
                 <div className="password--hint">
                    {password2 !== password ? "Passwords do not match" : ""}
                </div>
                
                <button 
                    className='form--submit'
                >
                    Submit
                </button>
                <div className="have-account">
                    Already have an account? 
                    <a href="login"> Login</a>
                </div>
            </form>
        </div>
        
    )
}


