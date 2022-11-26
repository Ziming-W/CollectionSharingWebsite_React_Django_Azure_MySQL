import {React, useState, useEffect, useContext} from "react";
import AuthContext from '../../context/AuthContext';
import Post from "./Posts";


export default  function History_post(){   
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
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + "profile/history/all", requestOptions)
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
                setLoaded(true);
                setData(result);
            },
            (error) => {
                setLoaded(true);
                setError(error);
            }
        );
    }, []);


    const [paginate, setpaginate] = useState(4);
    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 4);
    };

    const {user} = useContext(AuthContext);
    const allCategories = [...new Set(data.map(item => item.category))];
    const [menuItem, setMenuItem] = useState(data);

    const [filter, setFilter] = useState("");
    const [query, setQuery] = useState("");
    const items = Object.values(data);
    const search_parameters = Object.keys(Object.assign({}, ...data));
    
    function search(items) {
        let item = items.filter(
            (item) =>
                item.category.includes(filter) &&
                search_parameters.some((parameter) =>
                    item[parameter].toString().toLowerCase().includes(query.toLowerCase())
                ) 
        );
        
        return item;
    }
    function cate_name(name){
        switch (name) {
            case 'SC':
              return "Starcard"
            case 'AT':
              return "Antique"
            case 'PT':
              return "Painting"
            case 'CN':
              return "Coin"
            case 'BG':
                return "Bag"
            case 'SE':
                return "Shoes"
            case 'AH':
                return "Autograph"
            case 'SR':
                return "Souvenir"
            case 'OS':
                return "Others"
            default:
              return "Category"
          }
    }
    console.log(data.length)
    console.log(paginate)
    function setdefault(){
        setpaginate(4);
    }
    return (
        <div className="history--post">
            <div className="history--hero"/>
            <div className="break" />
            <div className="header-pic">
                {user.username[0]}
            </div>
            <div className="username">{user.username}'s Workplace</div>
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Search for..."
                        onChange={(e) => setQuery(e.target.value)}
                        onClick = {setdefault}
                    />
                </label>
                <div className="filter-select">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        onClick = {setdefault}
                        className="dropdown"
                        aria-label="Filter Countries By Region"
                    >
                        <option className="dropdown-menu" value="">Filter By Category</option>
                        {allCategories.map((item) => (
                            <option value={item}>Filter By {cate_name(item)}</option>
                        ))}
                    </select>
                    <span className="focus"></span>
                </div>
            </div>
            
            {data.length && (
                <>
                {menuItem.length < 1 && setMenuItem(data)}
                </>
            )}
            {!loaded && <div>A moment please...</div>}
            {error && (
                <div>please login again</div>
            )}
            <Post post={search(menuItem).slice(0, paginate)} page = {"history"}/>
            {(paginate < search(menuItem).length) &&
            
                <button onClick={load_more} className = "btn load--more">Load More</button>
            }
        </div>
    )
}