import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export default function Home({isAuth}) {

  const [postsList, setPostsList] = useState([]);

  const postCollection = collection(db, "posts");

  const deletePost = async(id)=> {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
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
    <div className='my-3 container'>
      {postsList.map((doc)=>{
        return  <div key={doc.id}>
                  <div className="card mb-5 mx-3">
                    <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" className="card-img-top" alt={doc.id}/>
                    {isAuth && doc.author.id===auth.currentUser.uid && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>deletePost(doc.id)} style={{color: "white"}}>Delete</button>
                    </span>}
                    <div className="card-body">
                      <h5 className="card-title">{doc.title}</h5>
                      <p className="card-text">{doc.post}</p>
                      <p className="card-text"><small className="text-muted">{doc.author.name}</small></p>
                    </div>
                  </div>
                </div>
      })}
    </div>
  )
}
