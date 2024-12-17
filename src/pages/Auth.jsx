import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthImg from '../assets/login.png';
import { loginAPI, registerAPI } from '../services/allapi';
import { tokenAuthContext } from '../context/Authcontext'
const Auth = ({ insideRegister }) => {

const {isAuthorised,setisAuuthorised}=useContext(tokenAuthContext)
const [isLoign,setIsLogin]=useState(false)

  const navigate = useNavigate()
  const [inputData,setInputData]= useState({
    username:"",email:"",password:"",userimg:""
  })
  console.log(inputData);

  const handleRegister = async(e)=>{
    e.preventDefault()
    console.log("inside handleRegister");
    if(inputData.username && inputData.email && inputData.password){
      // alert("make api call")
      try{
        const result = await registerAPI(inputData)
        console.log(result);
        if(result.status==200){
          alert(`Welcome ${result.data?.username}, Please login to explore...`)
          navigate('/auth')
          setInputData({username:"",email:"",password:""})
        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
          }
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Please fill the form!!")
    }
}


// const handleLogin = async (e) => {
//   e.preventDefault();
//   if (inputData.email && inputData.password) {
//     try {
//       const result = await loginAPI(inputData);
//       if (result.status === 200) {
//         const { user, token } = result.data;
        
//         // Save user and token in session storage
//         sessionStorage.setItem("user", JSON.stringify(user));
//         sessionStorage.setItem("token", token);
        
//         // Check user's role and navigate accordingly
//         if (user.role === "admin") {
//           navigate("/admindash");
//         } else {
//           navigate("/");
//         }
        
//         // Update states
//         setisAuuthorised(true);
//         setIsLogin(true);

//         // Clear input data and reset login state after navigation
//         setTimeout(() => {
//           setInputData({ username: "", email: "", password: "" });
//           setIsLogin(false);
//         }, 2000);
//       } else {
//         if (result.response.status === 404) {
//           alert(result.response.data);
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   } else {
//     alert("Fill the form completely");
//   }
// };

const handleLogin=async (e)=>{
  e.preventDefault()
  if(inputData.email && inputData.password){
 try{
 const result =await loginAPI(inputData)
 if(result.status==200){
          const { user, token } = result.data;

  sessionStorage.setItem("user",JSON.stringify(result.data.user))
  sessionStorage.setItem("token",result.data.token)
  if (user.role == "Admin") {
    navigate("/admindash");
  } else {
    navigate("/");
  }
  setisAuuthorised(true)
  setIsLogin(true)
  setTimeout(() => { setInputData({username:"",email:"",password:""})
 setIsLogin(false)
  }, 2000);
 }else{
  if(result.response.status==404){
    alert(result.resoponse.data)
  }
 }
 }catch(err){
  console.log(err);
  
 }
  }else{
alert("fill the form comletly")
  }
}


  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='flex justify-center items-center'>
      <div className='container w-3/4'>
        <div className='shadow-lg p-4 bg-white rounded-lg'>
          <div className='flex items-center'>
            <div className='w-full lg:w-1/2 mr-3'>
              {/* You can uncomment and add an image if you want */}
              <img className='img-fluid' src={AuthImg} alt="Authentication" />
            </div>
            <div className='w-full lg:w-1/2'>
              <h1 className='mt-2 text-3xl font-bold text-teal-600'>
                WordCratf
              </h1>
              <h5 className='text-lg text-gray-700'>
                Sign {insideRegister ? 'Up' : 'In'} to your Account
              </h5>

              <form>
                {insideRegister && 
                  <div className='mb-4'>
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium">Username</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={inputData.username}
                      onChange={(e) => setInputData({ ...inputData, username: e.target.value })}
                    />
                  </div>
                }

                <div className='mb-4'>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={inputData.email}
                    onChange={(e) => setInputData({ ...inputData, email: e.target.value })}

                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium">Password</label>
                  <input type="password" id="password"  placeholder="Password"
                    className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={inputData.password}
                    onChange={(e) => setInputData({ ...inputData, password: e.target.value })}

                  />
                </div>

                {insideRegister ? 
                  <div className='mt-3'>
                    <button className='w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-500 focus:outline-none' onClick={handleRegister} >
                      Register
                    </button>
                    <p className='mt-3 text-sm'>
                      Existing User?{' '}
                      <Link to={'/login'} className='text-teal-600 hover:underline'>
                        Login
                      </Link>
                    </p>
                  </div>
                 : 
                  <div className='mt-3'>
                    <button className='w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-500 focus:outline-none' onClick={handleLogin} >
                      Login
                      {/* Uncomment below to show a loading spinner */}
                      {/* {isLogined && <Spinner className='ml-2' animation="border" variant="light" />} */}
                    </button>
                    <p className='mt-3 text-sm'>
                      New User?{' '}
                      <Link className='text-teal-600 hover:underline' to={'/register'}>
                        Register
                      </Link>
                    </p>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
