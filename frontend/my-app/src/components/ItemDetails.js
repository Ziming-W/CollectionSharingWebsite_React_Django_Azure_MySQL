import React from "react"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "./slider/Slider";
import moment from "moment"

export default function ItemDetails() {
    const {id} = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + "post/" + id)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        }).then((actualData) => {
            setData(actualData);
            setError(null);
            })
            .catch((err) => {
            setError(err.message);
            setData(null);
            })
            .finally(() => {
            setLoading(false);
            });
        }, [id]);
    
    return (
        <body id="posts">
            {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {data &&
                data.map(({ pictures, belongToUser, title, descriptions, created_at, category}) => 
                (
                <div>
                    <div className="hero-image"></div>
                    <div className="history--hero" id="home-hero">
                        <div className="hero-heading" id="home-hero-heading">{title}</div>
                    </div>
                    <div className="w-container" id="recent-post">
                        <div className="item-details-img-wrapper">
                            <div className="category-tag-2">{category}</div>
                            <Slider pictures = {pictures} />
                        </div>
                        
                        <div className="text">
                            {(descriptions.length === 0) ? (<p>This user didn't leave any words.</p>) : (<p>{descriptions}</p>)}
                            
                        </div>
                        <div class="thumb-details w-clearfix">
                            <div className="user-avatar">{belongToUser.username[0]}</div>
                            <div class="author-title">{belongToUser.username}</div>
                            <div class="thumbnail-date">{moment(created_at).utc().format("YYYY-MM-DD")}</div>
                        </div>
                    </div>
                </div>))}
            
            
        </body>
        
    )
}

