import React from 'react';
import Layouts from '../components/Layouts/Layouts';
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';


const Contact = () => {
  return (
    <Layouts title={"Contact us"}>
        <div className="row contactus">
          <div className="col md-6">
            <img src="/images/contactus.jpeg" alt="contact US" style={{ width: "100%"}} />
          </div>
          <div className="col-md-5">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              Any Query and info about product feel free to ask and call us anytime. We are 24x7 available!!
            </p>
            <p className="mt-3">
            <AiOutlineMail/> : help@ecommerceapp.com
            </p>
            <p className="mt-3">
            <AiFillPhone/> : 080-23243222
            </p>
            <p className="mt-3">
            <BiSupport/> : 1800-8900-0000(toll free)
            </p>
          </div>
        </div>
    </Layouts>
  )
}

export default Contact