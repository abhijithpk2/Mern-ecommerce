import React from 'react';
import {Link} from "react-router-dom";
import Layouts from '../components/Layouts/Layouts';

const PageNotFound = () => {
  return (
    <Layouts title={"Oops !! Error"}>
      <div className="pnf-title">404
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/" className='pnf-btn'><button className="btn btn-secondary btn-lg">Go Back</button></Link>
      </div>
    </Layouts>
  )
};

export default PageNotFound