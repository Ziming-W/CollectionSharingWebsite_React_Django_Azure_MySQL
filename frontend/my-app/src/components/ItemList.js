import React from "react"
import image1 from "../images/car.jpg"
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo,useContext } from "react";
import moment from "moment"
import Pagination from './paging/Pagination';
import Post from "./HistoryPost/Posts";
import img_at from "../images/categories preview/antique.jpg"
import img_sc from "../images/categories preview/starcard.jpg"
import img_pt from "../images/categories preview/painting.jpg"
import img_cn from "../images/categories preview/coin.jpg"
import img_bg from "../images/categories preview/bag.jpg"
import img_se from "../images/categories preview/shoes.jpg"
import img_ah from "../images/categories preview/autograph.jpg"
import img_sr from "../images/categories preview/souvenir.jpg"
import img_os from "../images/categories preview/others.jpg"
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

let PageSize = 2;

export default function ItemList() {
    const {category} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const items = Object.values(data);
    const search_parameters = Object.keys(Object.assign({}, ...data));
    const [menuItem, setMenuItem] = useState(data);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "post/"+category)
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
    
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        console.log(lastPageIndex);
        var searchData = search(menuItem);
        if (searchData === []) {
            return searchData;
        } else {
            return searchData.slice(firstPageIndex, lastPageIndex);
        }
        
      }, [currentPage, menuItem]);

    function findTotalCount(data) {
        if (data === null) {
            return 0;
        }
        return data.length;
    }

    function findTitle(cat) {
        var image;
        var title = "Let's do it together."
        if (cat === "at") {
            image = img_at;
            title = "Antique"
        }
        if (cat === "sc") {
            image = img_sc;
            title = "Starcard";
        }
        if (cat === "pt") {
            image = img_pt;
            title = "Painting";
        }
        if (cat === "cn") {
            image = img_cn;
            title = "Coin";
        }
        if (cat === "bg") {
            image = img_bg;
            title = "Bag";
        }
        if (cat === "se") {
            image = img_se;
            title = "Shoes";
        }
        if (cat === "ah") {
            image = img_ah;
            title = "Autograph";
        }
        if (cat === "sr") {
            image = img_sr;
            title = "Souvenir"
        }
        if (cat === "os") {
            image = img_os;
            title = "Others"
        }
        return <div>
                <img className="item-list-image" src={image}></img>
                <div id="home-hero">
                    <div className="hero-heading" id="home-hero-heading">{title}</div>
                    <div className="hero-subheading">Share your own collections, join the world wide collection exhibition!</div>
                    {
                    user ? (
                        <>
                        <a className="hero-button" onClick={() => navigate("/upload-post")}>Make a Post</a>
                        </>
                    ) : (
                        <>
                        <a className="hero-button" onClick={() => navigate("/login")}>Make a Post</a>
                        </>
                    )
                }
                </div>
                </div>
        
    }

    function emptyPrompt(data) {
        if (data === null || data.length === 0) {
            return <p className="empty-prompt">Post the first one under this category!</p>
        }
    }
    
    function search(items) {
        return items.filter(
            (item) =>
                search_parameters.some((parameter) =>
                    item[parameter].toString().toLowerCase().includes(query.toLowerCase())
                )
        );
    }

    return (
        <body id="posts">
            {findTitle(category)}
            <div id="item-list-search">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Search for..."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
            </div>

            {data.length && (
                <>
                {menuItem.length < 1 && setMenuItem(data)}
                </>
            )}
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <div role="list" className="w-clearfix w-row" id="item-list-posts">
                {emptyPrompt(currentTableData)}
                <Post post={search(currentTableData)} />
            </div>

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={findTotalCount(data)}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </body>
    )
}

