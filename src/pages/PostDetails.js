import React,{useEffect, useState} from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import {Link, useNavigate} from "react-router-dom";


export default function PostDetails({isAuth, setAlert, postData}) {

    let navigate = useNavigate();
    const [postLikes, setPostLikes] = useState(postData.likes);

    const deletePost = async(id)=> {
        try{
          const postDoc = doc(db, "posts", id);
          await deleteDoc(postDoc);
          navigate('/');
          setAlert("You deleted the post.", "success");
        }catch(e){
          setAlert("Error", "danger");
        }
    }
    
    const updateLikes = async(id, likes)=>{
        try{
            const postDoc = doc(db, "posts", id);
            await updateDoc(postDoc, {
                likes: likes+1
            });
            setPostLikes(likes+1);
            setAlert("You liked the post.", "success");
        }catch(e){
            setAlert("Error", "danger");
        }
    }

    if (postData===null){
        return (<div className='text-center'>
                  No Post
                </div>
              );
      }

  return (
    <div className='container' style={{margin: "80px 40px"}}>
        <div className="card my-3">
            <img src={postData.imageUrl!=""? postData.imageUrl : "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"} className="card-img-top" alt={postData.id}/>
            {isAuth && postData.author.id===auth.currentUser.uid && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>deletePost(postData.id)} style={{color: "white"}}>Delete</button>
            </span>}
            <div className="card-body">
                <h5 className="card-title">{postData.title}</h5>
                <p className="card-text">{postData.post}</p>
            </div>
            <div className="my-3 mx-3 d-flex justify-content-between">
                {isAuth && <button type="button" className="btn btn-sm btn-light" onClick={()=>updateLikes(postData.id, postData.likes)}>{postLikes} Likes</button>}
                <p className="card-text"><small className="text-muted">{postData.author.name}</small></p>
            </div>
        </div>
    </div>
  )
}
