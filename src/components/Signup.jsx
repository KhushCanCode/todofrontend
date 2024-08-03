import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const history = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
   });

   
   //Setting the title and body in the inputs array
   const change = (e) => {
     const { name, value } = e.target;
     setInputs({ ...inputs, [name]: value });
   };
 
   //When Sign Up is clicked.
   const submit = async (e) => {
     e.preventDefault();
     try {
        const res = await axios.post(`https://todoback-three.vercel.app/api/v1/signup`, inputs);
        if(res.data.message === "User already exists!"){
          toast.error(res.data.message);
        }
        else{
          alert(res.data.message); //Successful Signup
          setInputs({
            username: "",
            email: "",
            password: ""
          });

          history('/login'); //Send to login page
        }
       
     } catch (error) {
      toast.error("Error occurred. Please try again later!");
      console.error("Error:", error);
    }
   };


  return (
    <>
     <ToastContainer position="bottom-right" autoClose={3000}/>
     
      <div className='h-[calc(100vh-5rem)] bg-sky-500 w-full flex justify-center items-center'>

        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">

          <div className="space-y-4">

            <h1 className="text-center text-2xl font-semibold text-sky-500">Sign Up</h1>

            <div>
              <label htmlFor="username" className="block mb-1 text-gray-600 font-semibold">Username</label>
              <input type='text' className="bg-gray-100 px-4 py-2 outline-none rounded-md w-full" 
              name='username'
              value={inputs.username}
              onChange={change}/>
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-600 font-semibold">Email</label>
              <input type="text" className="bg-gray-100 px-4 py-2 outline-none rounded-md w-full" 
              name='email'
              value={inputs.email}
              onChange={change}/>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">Password</label>
              <input type="password" className="bg-gray-100 px-4 py-2 outline-none rounded-md w-full" 
              name='password'
              value={inputs.password}
              onChange={change}/>
            </div>

          </div>

          <button className="mt-4 w-full bg-gradient-to-tr from-sky-600 to-sky-500 text-white py-2 rounded-md text-lg tracking-wide mb-2"
          onClick={submit}
          >Sign Up</button>
          <p className='text-center text-gray-600'>Already a user? <Link to='/login' className='text-sky-500'>Login</Link></p>

        </div>

      </div>
    </>
  );
}

export default Signup;
