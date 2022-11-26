import React from 'react';
import Footer from './components/Footer'
import Navbar from './components/Navigation'
import Home from './components/Home'
import Upload from './components/UploadPost'
import { AuthProvider } from './context/AuthContext'
import History_post from './components/HistoryPost/HistoryPost';
import Item_list from './components/ItemList';
import Item_details from './components/ItemDetails';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sign_up from './components/SignUp';
import Login from './components/Login';
import { Navigate } from 'react-router-dom';

export default function App(){
    return (
        
            <Router>
                <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path='/sign-up' element={<Sign_up/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/home' element={<Home/>} />
                    <Route path='/upload-post' element={<Upload/>} />
                    <Route path='/history-post' element={<History_post/>} />
                    <Route path='/item_list/:category' element={<Item_list/>} />
                    <Route path='/item_list/item_details/:id' element={<Item_details/>} />
                    <Route path='/item_details/:id' element={<Item_details/>} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    
                </Routes>
                <Footer />
                </AuthProvider>

            </Router>
       
    )
}