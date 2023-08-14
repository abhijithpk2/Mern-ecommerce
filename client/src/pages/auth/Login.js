import React, { useState } from 'react';
import Layouts from '../../components/Layouts/Layouts';
import axios from 'axios';
import  {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/Auth';



const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth,setAuth] = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  // Form functioning
  const handleSumbit = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/login" ,
      {email,password}
      );
      if(res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth',JSON.stringify(res.data ))
        navigate(location.state ||'/');
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!!")
    }

  }

  return ( 
    <Layouts title={"Login to your Account"}>
      <div className="form-container mt">
        <h1 className="title text-center mt-4">Login Page</h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              required
            />
          </div>

          
            <p type="submit" className="" onClick={ () => { navigate('/forgot-password') }} >
              Forgot Password
            </p>
          
          <button type="submit" className="btn btn-primary" >
            Login
          </button>
        </form>
      </div>
    </Layouts>
  );
}

export default Login