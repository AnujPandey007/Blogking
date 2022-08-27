import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import NavBar from './components/NavBar';
import { useState } from 'react';
import Alert from './components/Alert';
import PostDetails from './pages/PostDetails';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [customAlert, setCustomAlert] = useState(null);
  const [postData, setPostData] = useState(null);
  const [mode, setMode] = useState(false);

  const toggleMode=()=>{
    if(mode){
      setMode(false);
      setAlert("Dark Mode Disabled", "success");
      document.title="BlogKing Light";
    }else{
      setMode(true);
      setAlert("Dark Mode Enabled", "success");
      document.title="BlogKing Dark";
    }
  };

  const setAlert=(message, type)=>{
    let alertObject = {
      message: message,
      type: type
    }
    setCustomAlert(alertObject);

    setTimeout(() => {
      setCustomAlert(null)
    }, 1500);
  }

  return (
    <>
    <Router>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} mode={mode} toggleMode = {toggleMode}/>
      <Alert customAlert={customAlert}/>
      <Routes>
        <Route path='/' element={<Home setPostData={setPostData} mode={mode} toggleMode = {toggleMode}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} setAlert={setAlert}/>}></Route>
        <Route path='/post' element={<PostDetails isAuth={isAuth} setAlert={setAlert} postData={postData}/>}></Route>
      </Routes>

    </Router>
    </>
  );
}

export default App;
