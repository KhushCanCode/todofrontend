import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home';
import About from './components/Aboutus';
import Todo from './components/Todo';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { authActions } from './store';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const id = sessionStorage.getItem("id"); //User Id
    if(id){
      dispatch(authActions.login());
    }

  }, []);

  return (
    <Router>
    <Header/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </Router>
  )
}

export default App
