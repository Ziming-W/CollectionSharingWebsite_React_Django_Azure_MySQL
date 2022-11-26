import React,{useEffect, useState} from "react";
import image1 from "../../images/bg--image.jpg"
import moment from "moment";

export default function PostCard({post, page}){
    function presentImg(arr) {
        if (arr.length>0) {
            return <img src={arr[0].image} className="featured-image"></img>
        }
        return <img src={image1} className="featured-image"></img>
    }
    if(page === "history"){
        let token = localStorage.getItem('authTokens', JSON.stringify(null))
        token = JSON.parse(token)

        var myHeaders = new Headers();
        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36");
        myHeaders.append("Authorization", "Bearer " + token.access);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };
    }

    function rmPost(id){
        console.log(id);
        fetch(process.env.REACT_APP_BACKEND_URL + "manage/deletePost/" + id, requestOptions)
            .then((response) => console.log(response))
            .catch(error => console.log('error', error));
        window.location.reload();
    }

    function sliceDescriptions(des) {
        if (des.length == 0) {
            return <div className="featured-description">This user didn't left any words.</div>
        }
        if (des.length>60) {
            return <div className="featured-description">{des.slice(0,60)}...</div>
        }
        return <div className="featured-description">{des}</div>
    }
    
    return(
        // <div className="card-grid" id="his-categories">
        <div role="list" className="w-clearfix w-row" id="his-items">
            {
                post.map((item) => {return (
                <div role="listitem" className="list-item w-col-6" id="item">
                    <a href={`item_details/${item.id}`} className="featured-wrapper w-inline-block">
                        <div>
                            <div className="category-tag-2">{item.category}</div>
                            {presentImg(item.pictures)}
                        </div>
                        
                        <div className="featured-text">
                            <div className="featured-title">{item.title}</div>
                            {sliceDescriptions(item.descriptions)}
                            <div className="featured-details">
                                <div className="w-clearfix">
                                    <div className="user-avatar">{item.belongToUser.username[0]}</div>
                                    <div className="author-title lite">{item.belongToUser.username}</div>
                                    <div className="thumbnail-date lite">{moment(item.created_at).utc().format("YYYY-MM-DD")}</div>
                                </div>
                            </div>
                        </div>                    
                    </a>
                    {(page === "history") && <button className='his-img-rm-btn' onClick={() => rmPost(item.id)}>x</button>}
                </div>
                )})
            }
        </div>
    )
}