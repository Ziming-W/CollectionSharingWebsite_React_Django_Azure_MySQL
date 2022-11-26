import React from "react"
import { useState, useEffect } from "react";



export default function User_Profile() {
  
    let token = localStorage.getItem('authTokens', JSON.stringify(null))
    token = JSON.parse(token)

    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36");
    myHeaders.append("Authorization", "Bearer " + token.access);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/profile", requestOptions)
        .then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then(
            (result) => {
                setData(result);
            }
        )
        .catch(error => console.log('error', error));
    }, []);
    
    console.log(data);
    return (
        
        <div className='userprofile-container'>
            <div className='userprofile_background' />
            <form className='upload--form'>
            <h1 className="useprofile-header">User Profile</h1>


            {
                data.map((item) => {return (                    
                    <div>
                         <div>
                                <h2 className="useprofile-text">{item.username}</h2>
                        </div>

                        <div>
                                <h2 className="useprofile-text">{item.email}</h2>
                        </div>

                        <div>
                                <h2 className="useprofile-text">{item.date_joined}</h2>
                        </div>
                    </div>
                )})
            }
                
            <h2 className="useprofile-text">
                <a href="history-post" >Click here to post history</a>
                </h2>
           
            </form>
        </div>
        
    )

  
}


