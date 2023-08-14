import React, { useState } from 'react';
import Layouts from '../../components/Layouts/Layouts';
import axios from 'axios';
import  {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()

  // Form functioning
  const handleSumbit = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/register" ,
      {name,email,password,phone,address,answer}
      );
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login');
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!!")
    }

  }

  return (
    <Layouts title={"Register - Create an Account"}>
      <div className="form-container mt">
        <h1 className="title text-center mt-4">Register Page</h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              required
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

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone1"
              placeholder="Enter your Phone"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress1"
              placeholder="Enter your Address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer11"
              placeholder="Your favorite sports name !"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layouts>
  );
}

export default Register;