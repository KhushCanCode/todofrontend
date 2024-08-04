import  {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authActions } from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
   });

   //Setting the title and body in the inputs array
   const change = (e) => {
     const { name, value } = e.target;
     setInputs({ ...inputs, [name]: value });
   };
 
   //When Login button is clicked.
   const submit = async (e) => {
     e.preventDefault();
     try {
        const res = await axios.post(`https://todobackend-nu.vercel.app/api/v1/login`, inputs);

        if(res.data.message === "No Such Account Found!" || res.data.message === "Password is incorrect!"){
          toast.error(res.data.message);
        }
        else{
          sessionStorage.setItem("id", res.data.others._id);
          dispatch(authActions.login());
          alert(res.data.message);
          history('/todo');
        };

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

            <h1 className="text-center text-2xl font-semibold text-sky-500">Log In</h1>
           
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
          onClick={submit}>Log In</button>
          <p className='text-center text-gray-600'>Don't have an account? <Link to='/signup' className='text-sky-500'>Signup</Link></p>

        </div>

      </div>
    </>
  );
}

export default Login;
