import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{!user ? <Navigate to="/login-page" /> :   children}</Route>
    )
}

export default PrivateRoute;