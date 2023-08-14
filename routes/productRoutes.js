import express  from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, 
         deleteProductController,
         getProductController,
         getSingleProductController, 
         productFilterController,
         productPhotoController, 
         updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()

// routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// get all products 
router.get("/get-product", getProductController);

// get single product
router.get('/get-product/:slug',getSingleProductController);

// get product photo
router.get('/product-photo/:pid',productPhotoController)

// delete product
router.delete('/product-delete/:pid', deleteProductController)

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// filter products 
router.post('/product-filter',productFilterController)
export default router