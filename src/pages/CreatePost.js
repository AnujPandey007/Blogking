import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({isAuth}) {

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const postCollection = collection(db, "posts");

  let navigate = useNavigate();

  const handleTitle = (event)=>{
    setTitle(event.target.value);
  }

  const handlePost = (event)=>{
    setPost(event.target.value);
  }

  const storeToDB = async()=>{
    try{
      await addDoc(postCollection, {
        title: title,
        post: post,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName
        }
      });
      navigate('/');
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
        <button type="submit" className="btn btn-primary" onClick={storeToDB}>Submit</button>
      </div>
    </>
  )
}
