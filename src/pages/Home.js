import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import {Link, useNavigate} from "react-router-dom";

export default function Home({setPostData}) {

  const [postsList, setPostsList] = useState([]);

  const postCollection = collection(db, "posts");

  let navigate = useNavigate();

  const postPage = (doc)=> {
    setPostData(doc);
    // localStorage.setItem("postID", doc.id);
    navigate('/post');
  }

  useEffect(()=>{
      const getPosts = async() =>{
        const data = await getDocs(postCollection);
        setPostsList(data.docs.map((doc)=>({
          ...doc.data(), id: doc.id
        })));
      }
      getPosts();
  });


  if (postsList.length===0){
    return (<div className='text-center'>
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          );
  }

  return (
    <div className='my-3 container mx-3' style={{margin: "80px 40px"}}>
      <div className='row' style={{margin: "80px 10px 20px 20px"}}>
      {postsList.map((doc)=>{
        return (<div key={doc.id} className="col-md-3 container">
                  <div className="card mb-5 mx-3 my-3" style={{width: "18rem", height: "20rem"}}>
                  <img style={{height: "12rem"}} src={doc.imageUrl!=""? doc.imageUrl : "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"} className="card-img-top" alt={doc.id}/>
                    <div className="card-body">
                      <h5 className="card-title">{doc.title}</h5>
                      <button className="btn btn-sm btn-primary" onClick={()=>postPage(doc)}>Read More</button>
                    </div>
                  </div>
                </div>)
      })}
      </div>
    </div>
  )
}
