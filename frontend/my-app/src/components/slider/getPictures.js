import image1 from "../../images/bg--image--home.jpg";
export const  getPictures = ({pictures}) => {
  const images = [];
  if (pictures.length > 0) { 
  pictures.forEach((pic) => {
    const url = pic.image;
    console.log(typeof(url));
      images.push({ url });
  });}
  else {
    const url = image1;
    const title = "This post has no image, default image displayed."
    images.push({ title, url });
  }
  return images;
 }