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

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <>
    <Router>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth}/>

      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost'createpost element={<CreatePost isAuth={isAuth}/>}></Route>
      </Routes>

    </Router>
    </>
  );
}

export default App;
