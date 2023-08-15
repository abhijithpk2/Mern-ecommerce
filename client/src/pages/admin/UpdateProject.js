import React, { useEffect, useState } from "react";
import Layouts from "../../components/Layouts/Layouts";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate,useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProject = () => {
  const navigate = useNavigate();
  const params = useParams();
  // to get all the catagories from CreateCategory page
  const [categories, setCategories] = useState([]);

  // to get all the product models
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");

//   to get the categories of admin products list update page
const [id,setId] = useState("")

  // get single product 
  const getSingleProduct = async () => {
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
        setName(data.product.name);
        setId(data.product._id)
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
    } catch (error) {
        console.log(error);
    }
  };
  useEffect(()=>{
    getSingleProduct();
    // eslint-disable-next-line
  },[])

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);

      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`, 
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

//   Delete Product 
const handleDelete = async() => {
    try {
        let answer = window.prompt("Are you sure about deleting!!");
        if(!answer) return;
        const { data } = await axios.delete(
          `/api/v1/product/product-delete/${id}`);
          toast.success("Product deleted Successfully");
          navigate('/dashboard/admin/products')
        
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong");

    }
}
  return (
    <Layouts title={"Dashboard - Create Product"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {/* image preview */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              {/* name field */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* description field */}
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write product description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price field */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write product price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* quantity field */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="How much quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* product shipping */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="select shipping"
                  size="large"
                  showSearch
                  className="form-control mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
              </div>

              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default UpdateProject;
