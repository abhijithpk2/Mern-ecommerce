import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async(req,res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;

        // validations
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res.status(500).send({ error: "Photo is Required & less than 1mb" });
        }

        const products = new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"products created succesfully",
            products,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in creating PRODUCT",
            error
        })
    }
}

// Get all products

export const getProductController = async(req,res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success:true,
      countTotal:products.length,
      message:"All products",
      products
    })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error in getting all products",
      error:error.message,
    })
    
  }
}

// get single product 
export const getSingleProductController = async(req,res) => {
  try {
    const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
    res.status(200).send({
      success:true,
      message:"Single product fetched",
      product
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in getting single product",
      error
    })
  }
}

// product photo

export const productPhotoController = async(req,res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set('content-type',product.photo.contentType)
      res.status(200).send(product.photo.data);
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in getting photo",
      error:error.message,
    })
  }
}

// delete product
export const deleteProductController = async(req,res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
      success:true,
      message:"Product deleted successfully"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Error in deleteing product",
      error:error.message
    })
  }
};

// update product
export const updateProductController = async(req,res) => { try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;

        // validations
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case photo && photo.size > 1000000:
            return res.status(500).send({ error: "Photo is Required & less than 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
          {...req.fields, slug:slugify(name)}, {new:true} )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"products updated succesfully",
            products,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in updating PRODUCT",
            error
        })
    }
}