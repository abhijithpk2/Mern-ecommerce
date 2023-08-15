import  express  from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//  router object
const router = express.Router()

// routing
// Register || Method POST
router.post('/register',registerController);

// Login || POST
router.post('/login',loginController)

// Forgot password || Post 
router.post('/forgot-password',forgotPasswordController)

// test router
router.get("/test", requireSignIn, isAdmin, testController)

// PROTECTED USER ROUTES AUTH
router.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
});

// PROTECTED ADMIN ROUTES AUTH
router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ok:true});
});

export default router;  