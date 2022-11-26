import React from "react"
import { useState, useEffect,useContext } from "react";
import moment from "moment"
import AuthContext from '../context/AuthContext';
import image1 from "../images/bg--image.jpg"
import img_at from "../images/categories preview/antique.jpg"
import img_sc from "../images/categories preview/starcard.jpg"
import img_pt from "../images/categories preview/painting.jpg"
import img_cn from "../images/categories preview/coin.jpg"
import img_bg from "../images/categories preview/bag.jpg"
import img_se from "../images/categories preview/shoes.jpg"
import img_ah from "../images/categories preview/autograph.jpg"
import img_sr from "../images/categories preview/souvenir.jpg"
import img_os from "../images/categories preview/others.jpg"

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + `home/`)
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
    }, []);

    const replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = image1; 
    }

    function findPic(arr) {
        if (arr.length>0) {
            return <img src={arr[0].image} className="featured-image"></img>
        }
        return <img src={image1} className="featured-image"></img>
    }

    function sliceDescriptions(des) {
        if (des.length == 0) {
            return <div className="featured-description">This user didn't leave any words.</div>
        }
        if (des.length > 60) {
            return <div className="featured-description">{des.slice(0,60)}...</div>
        }
        return <div className="featured-description">{des}</div>
    }

    return (
        <body id="home">
            <div className="hero-image"></div>
            <div id="home-hero">
                <div className="hero-heading" id="home-hero-heading">Let's do it together.</div>
                <div className="hero-subheading">Share your own collections, join the world wide collection exhibition!</div>
                {
                    user ? (
                        <>
                        <a className="hero-button" href="upload-post">Make a Post</a>
                        </>
                    ) : (
                        <>
                        <a className="hero-button" href="login">Make a Post</a>
                        </>
                    )
                }
                
            </div>
            <div className="w-container" id="recent-post">
                <div>
                    <h2>Recent Posts</h2>
                    <div className="med-divider"><hr></hr></div>
                </div>
                {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                <div role="list" className="w-clearfix w-row">
                    <div role="listitem" className="list-item w-col-6" id="recent-items">
                    {data &&
                    data.map(({ id, category, pictures,
                            title, descriptions, belongToUser, created_at}) => (
                        <a href={`item_details/${id}`} className="featured-wrapper w-inline-block" id="recent-item">
                        <div>
                            <div className="category-tag-2">{category}</div>
                            {findPic(pictures)}
                        </div>
                        
                        <div className="featured-text">
                            <div className="featured-title">{title}</div>
                            {sliceDescriptions(descriptions)}
                            <div className="featured-details">
                                <div className="w-clearfix">
                                    <div className="user-avatar">{belongToUser.username[0]}</div>
                                    <div className="author-title lite">{belongToUser.username}</div>
                                    <div className="thumbnail-date lite">{moment(created_at).utc().format("YYYY-MM-DD")}</div>
                                </div>
                            </div>
                        </div>
                        </a>
                    ))}
                    </div>
                </div>
            </div>
            <div id="categories">
                <div>
                    <h2>Categories</h2>
                    <div className="med-divider"><hr></hr></div>
                </div>
                <div className="blog-thumbnail">
                    <a href={`item_list/${"at"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Antique</div>
                            <img src={img_at} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"sc"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Starcard</div>
                            <img src={img_sc} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"pt"}`}  className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Painting</div>
                            <img src={img_pt} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"cn"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Coin</div>
                            <img src={img_cn} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"bg"}`}  className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Bag</div>
                            <img src={img_bg} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"se"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Shoes</div>
                            <img src={img_se} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"ah"}`}  className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Autograph</div>
                            <img src={img_ah} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"sr"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">souvenir</div>
                            <img src={img_sr} className="thumbnail-image"></img>
                        </div>
                    </a>
                    <a href={`item_list/${"os"}`} className="thumbnail-wrapper">
                        <div className="image-wrapper">
                            <div className="category-text">Others</div>
                            <img src={img_os} className="thumbnail-image"></img>
                        </div>
                    </a>
                </div>
            </div>
        </body>
    )
}

