import mongoose from "mongoose";
import  express  from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ysgangwarfbd:midnightcafe2001@midnightcafe.yjhnwfj.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const userSchema= new mongoose.Schema({
    username:String,
    password:String
});

const userModel=new mongoose.model("users",userSchema);
app.post("/authRegister",async(req,res)=>{
    const {username,password}= req.body;
    const isUserPresent=await userModel.findOne({username});
    if(isUserPresent)
        return res.json({message:"300"});
    const usersdata= new userModel();
    usersdata.username=req.body.username;
    usersdata.password=req.body.password;
    await usersdata.save();
    return res.json({message:"Success"});
});
app.post("/authLogin",async(req,res)=>{
    const {username,password}=req.body;
    const isUserPresent=await userModel.findOne({username});
    if(!isUserPresent) return res.json({message:"300"});
    if(isUserPresent.password!==password) return res.json({message:"301"});
    const token = jwt.sign({id:isUserPresent._id},"secret");
    res.json({token,userID:isUserPresent._id}); 
    return res.json({message:"succcess"});
});

app.listen(3001,()=>{
    console.log("Server Online");
});