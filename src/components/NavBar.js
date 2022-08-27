import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import {signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';

export default function NavBar({isAuth, setIsAuth, mode, toggleMode}) {

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
      <nav className={`navbar fixed-top navbar-expand-lg bg-${mode===true? "dark" : "light"}`}>
        <div className="container-fluid">
          <Link className={`navbar-brand text-${mode===true? "light" : "dark"}`} to="/">BlogKing</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !isAuth ? 
                (<li className="nav-item">
                  <button type="button" className={`btn btn-outline-${mode===true? "dark" : "light"} text-${mode===true? "light" : "dark"}`} onClick={signInWithGoogle}>Login</button>
                </li>)
                :  
                (<>
                <li className="nav-item">
                  <Link className={`nav-link text-${mode===true? "light" : "dark"}`} to="/createpost">Create Post</Link>
                </li>

                <li className="nav-item">
                  <button type="button" className={`btn btn-outline-${mode===true? "dark" : "light"} text-${mode===true? "light" : "dark"}`} onClick={signUserOut}>Logout</button>
                </li>
                </>
                )

              }
            </ul>
          </div>
          <div className={`form-check form-switch text-${mode===true? "light" : "dark"}`}>
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleMode} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" color='red'>{mode===true? "Disable Dark Mode" : "Enable Dark Mode"}</label>
          </div>
        </div>
      </nav>
    </div>
  )
}
