import React from 'react';
import Layouts from "../../components/Layouts/Layouts";
import UserMenu from '../../components/Layouts/UserMenu';


const Orders = () => {
  return (
    <Layouts title={"Your Orders"}>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Your Orders</h1>
                </div>
            </div>
        </div>

    </Layouts>
  )
}

export default Orders