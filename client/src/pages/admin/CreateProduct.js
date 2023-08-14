import React from 'react';
import Layouts from '../../components/Layouts/Layouts'
import AdminMenu from '../../components/Layouts/AdminMenu';

const CreateProduct = () => {
  return (
    <Layouts title={"Dashboard - Create Product"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default CreateProduct