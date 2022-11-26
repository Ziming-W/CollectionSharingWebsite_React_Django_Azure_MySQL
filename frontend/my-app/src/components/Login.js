import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

export default function Login() {
    let {loginUser} = useContext(AuthContext)
    return (
        <div className='authentication-form-container'>
            <div className='login-background' />
            <form className='form' onSubmit={loginUser}>
            <div className="login">Log in</div>
                <input
                    type = "text"
                    placeholder = "Username"
                    className='form--input'
                    name = "username"
                    maxLength = "30"
                />
                <input
                    type = "password"
                    placeholder = "Password"
                    className='form--password'
                    name = "password"
                    maxLength = "30"
                />
                
                <button 
                    className='form--submit'
                    type="submit"
                >
                    Submit
                </button>
                <div className="have-account">
                    Do not have an account?
                    <a href="sign-up"> Sign Up</a>
                </div>

            </form>
        </div>
    )

  
}


