import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';

export default function NavBar({isAuth, setIsAuth}) {

  let navigate = useNavigate();

  const signInWithGoogle = async()=>{
    try{
      const result = await signInWithPopup(auth, provider);
      if(result.user!=null){
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate('/');
      }
    }catch(e){
      console.log("error");
    }
    
  }

  const signUserOut = async()=>{
    try{
      await signOut(auth);
      localStorage.clear();
      setIsAuth(false);
      navigate('/');
    }catch(e){
      console.log("error");
    }
  }
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                !isAuth ? 
                <button type="button" className="btn btn-outline-light" style={{color: "black"}} onClick={signInWithGoogle}>Login</button>:  
                
                <>
                <li className="nav-item">
                  <Link className="nav-link" to="/createpost">Create Post</Link>
                </li>

                <button type="button" className="btn btn-outline-light" style={{color: "black"}} onClick={signUserOut}>Logout</button>
                </>

              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
