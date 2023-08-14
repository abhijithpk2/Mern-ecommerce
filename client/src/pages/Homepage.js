import React from 'react';
import Layouts from '../components/Layouts/Layouts';
import { useAuth } from '../context/Auth'; 

const Homepage = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layouts title={"Best Offers"}>
        Homepage
        <pre>{JSON.stringify(auth, null ,4)}</pre>
    </Layouts>
  )
}

export default Homepage