import React from 'react';
import AdminMenu from '../../components/Layouts/AdminMenu';
import Layouts from './../../components/Layouts/Layouts';
import { useAuth } from '../../context/Auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layouts title={"Dashboard - Admin Panel"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>

    </Layouts>
  )
}

export default AdminDashboard