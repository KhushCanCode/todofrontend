
import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/list.png';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';


function Header() {

  const isLoggedIn = useSelector((state)=> state.isLoggedIn);
  const dispatch = useDispatch();

  const logout = ()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  }
  return (
    <>
     <header >

        <div className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 ">
          
          <div className="logo h-12 w-12 ">
            <img src={logo} alt="..." className='h-full w-full'/>
          </div>
          
          <div className="flex flex-1 items-center justify-between">
            <nav className='navbar'>
                  <ul className="flex items-center gap-6 text-xl">
                      <li>
                          <Link to='/' className="text-sky-500 transition hover:underline" > Home  </Link>
                      </li>
                      <li>
                          <Link to='/about' className="text-sky-500  transition hover:underline" > About Us </Link>
                      </li>
                  </ul>
            </nav>

            <div className="flex items-center gap-7">
                  <ul className="flex items-center gap-6 text-xl">
                      {!isLoggedIn && 
                      <>
                      <li>
                          <Link to='/signup' className="text-gray-100  bg-sky-500 p-2 rounded-lg transition hover:bg-gray-300"> Sign Up  </Link>
                      </li>
                      <li>
                          <Link to='/login' className="text-gray-100  bg-sky-500 p-2 rounded-lg transition hover:bg-gray-300" href="#"> Log In </Link>
                      </li>  
                      </>}

                      {isLoggedIn && 
                      <>
                        <li>
                        <Link to='/' className="text-gray-100  bg-sky-500 p-2 rounded-lg transition hover:bg-gray-300"
                        onClick={logout}> Log Out  </Link>
                      </li>
                      <Link to='/todo'>
                          <i className="fa-solid fa-user text-2xl text-sky-800 transition hover:text-gray-300 "></i>
                        </Link>
                      </>
                      }
                  </ul>
            </div>

          </div>

        </div>

      </header>
    </>
  )
}

export default Header
