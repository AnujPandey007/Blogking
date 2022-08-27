import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export default function CreatePost({isAuth, setAlert}) {

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  let imageUrl = "";

  const postCollection = collection(db, "posts");

  let navigate = useNavigate();

  const handleTitle = (event)=>{
    setTitle(event.target.value);
  }

  const handlePost = (event)=>{
    setPost(event.target.value);
  }

  const handleImage = (event)=>{
    setImageUpload(event.target.files[0]);
  }

  const uploadImage = async()=> {
    if(imageUpload!==""){
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const result = await uploadBytes(imageRef, imageUpload);
      const imgUrl = await getDownloadURL(result.ref);
      imageUrl = imgUrl;
    }
  }

  const storeToDB = async()=>{
    try{
      if(title.length!==0&&post.length!==0){
        setAlert("Wait...", "info");
        await uploadImage();
        await addDoc(postCollection, {
          title: title,
          post: post,
          imageUrl: imageUrl,
          likes: 0,
          author: {
            id: auth.currentUser.uid,
            name: auth.currentUser.displayName
          }
        });
        setAlert("Your post is uploaded.", "success");
        navigate('/');
      }else{
        setAlert("Please Fill Up.", "danger");
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    if(!isAuth){
      navigate('/');
    }
  }, [isAuth, navigate])

  return (
    <>
      <div className='container my-3'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleTitle}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Post</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={handlePost}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFileSm" className="form-label">Upload Image</label>
          <input className="form-control form-control-sm" id="formFileSm" type="file" accept="image/*" onChange={handleImage}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={storeToDB}>Submit</button>
      </div>
    </>
  )
}
