
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(()=> 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> 
    localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  let loginUser = async (e)=> {
    e.preventDefault()
    let response = await fetch(process.env.REACT_APP_BACKEND_URL + 'api/token/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
    })
    let data = await response.json()

    if(response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        navigate("/home");
    }else{
        alert('Something went wrong!')
    }
}
  
  const registerUser = async (username, password, password2) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2
      })
    });
    
    if (response.status === 201) {
        navigate("/login");
    } else {
      alert("Your username is invalid, or your password is password or too simple!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/home");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};