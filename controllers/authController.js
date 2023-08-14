 import { comparePassword, hashPassword } from "../helpers/authHelper1.js"
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

 
 export const registerController = async (req,res) => {
    try{
        const {name,email,password,phone,address,answer} = req.body

        // validations
        if(!name){
            return res.send({message:"Name is required!"})
        }
        if(!email){
            return res.send({message:"email is required!"})
        }
        if(!password){
            return res.send({message:"password is required!"})
        }
        if(!phone){
            return res.send({message:"phone is required!"})
        }
        if(!address){
            return res.send({message:"Address is required!"})
        }
          if (!answer) {
            return res.send({ message: "Answer is required!" });
          }

        // check user
        const existingUser = await userModels.findOne({email})

        // existing User
        if(existingUser) {
            return  res.status(200).send({
                success:false,
                message:"Already Registered please login"
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModels({name,email,phone,address,password:hashedPassword,answer}).save();
            res.status(201).send({
                success:true,
                message:"User registered successfully",
                user
            }) 
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
 };

// POST Login

export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body
        // validation
        if(!email|| !password){
            return res.status(404).send({
                success:false,
                message:"Invalid username or password"
            })
        }
        // check User
        const user = await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
};

// forgot Password Controller
export const forgotPasswordController = async (req,res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if(!email){
            res.status(400).send({message:"Email is required! "})
        }
        if (!answer) {
          res.status(400).send({ message: "answer is required! " });
        }
        if (!newPassword) {
          res.status(400).send({ message: "new PAssword is required! " });
        }
        // check
        const user = await userModels.findOne({email,answer})
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModels.findByIdAndUpdate(user._id,{ password : hashed}) ;
        res.status(200).send({
            success:true,
            message: "Password Reset Successfully",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something Went Wrong",
            error
        })
    }
}

// test router
export const testController = (req,res) =>{
    res.send("Protected Route");

}