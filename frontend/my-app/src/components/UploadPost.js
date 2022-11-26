import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Upload_Post() {

    const navigate = useNavigate()
    const [imgsSrc, setImgsSrc] = useState([]);
    const[Id, setId] = useState(0);

    const [formData, setFormData] = useState({
        title: "", 
        descriptions: "",
        category: "",
    })
    let finalForm = new FormData()

    let token = localStorage.getItem('authTokens', JSON.stringify(null))
    token = JSON.parse(token)

    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36");
    myHeaders.append("Authorization", "Bearer " + token.access);

    const handleSubmit = event => {
        
        if(!formData.title || !formData.category || !imgsSrc.length || (formData.category === "choose")){
            alert('Form cannot be empty!')
        } else {
            finalForm.append("title", formData.title);
            finalForm.append("description", formData.descriptions);
            finalForm.append("category", formData.category);
            for(const item of imgsSrc){
                finalForm.append("images", item.urlForDb);
            }
            
            fetch(process.env.REACT_APP_BACKEND_URL + "manage/uploadPost", {
                method: 'POST',
                headers: myHeaders,
                body: finalForm
            })
            .then(res => console.log(res))
            .catch(error => console.log('error', error));
            navigate("/history-post");
        }
    }

    function handleChange(event){
        const{name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const uploadImg = (e) => {
      for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        for (const item in imgsSrc) {
            if(imgsSrc[item].name === e.target.files[0].name){
                return;
            }
        }
        if(imgsSrc.length < 8){
            reader.onload = () => {
                setImgsSrc((preValue) => {
                  return[
                      ...preValue,
                      {
                          id: Id,
                          images: reader.result,
                          name: e.target.files[0].name,
                          urlForDb: e.target.files[0]
                      }
                  ]})
              };
        }
        reader.onerror = () => {
          console.log(reader.error);
        };
      }
      setId(Id+1);
    };

    const rmImg = (id) => {
        const result = imgsSrc.filter((data) => data.id !==id);
        setImgsSrc(result);
        return;
    };
    
    return (
        <div className='upload-form-container'>
            <div className='upload-form-background' />
            <form className='upload--form' 
                onSubmit={handleSubmit} 
                encType = "multipart/form-data" 
            >
                <div className='left-column'>
                    <div className="upload-image-form">
                        <input
                            type = "file"
                            // multiple
                            className='image--form'
                            onChange={uploadImg}
                            name = "file[]"
                            id='uploadimage'
                        />
                        <div className="form-placehoder" data-title="Click to upload" />
                        <div className='broader'/>
                    </div>
                    {imgsSrc.map((item) => {return(
                        <div className='preview-img-border'>
                            <img className='preview-img' src={item.images} />
                            <div onClick={() => rmImg(item.id)} className='img-rm-btn'>x</div>
                        </div>
                        
                    )})}
                </div>
                <div className='right-column'>
                    <input
                        type = "text"
                        className='title--form'
                        onChange={handleChange}
                        name = "title"
                        value={formData.title}
                        maxLength = "260"
                        placeholder='Add your title'
                    />
            
                    <label className="upload-form-label">Type of Collection</label>
                    <select
                        id='Type of Collection'
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        className='choose--form'
                    >
                        <option value="choose">Select one...</option>
                        <option value="AT">Antique</option>
                        <option value="SC">Starcard</option>
                        <option value="PT">Painting</option>
                        <option value="CN">Coin</option>
                        <option value="BG">Bag</option>
                        <option value="SE">Shoes</option>
                        <option value="AH">Autograph</option>
                        <option value="SR">souvenir</option>
                        <option value="OS">Others</option>
                    </select>

                    <label className="upload-form-label">Tell everyone what your Post is about</label>
                    <input
                        type = "text"
                        className='description--form'
                        onChange={handleChange}
                        name = "descriptions"
                        value={formData.descriptions}
                        maxLength = "260"
                        contentEditable="true"
                    />
                <button 
                    className='post--submit'
                >
                    Submit
                </button>
                </div>
            </form>
        </div>   
    )
}


