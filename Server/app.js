import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import myModel from './models/model.js'
import { config } from 'dotenv';
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","http://kingjaweedfrontend.onrender.com"]
}));
config()
const port=process.env.PORT || 5000;
const mongoUrl=process.env.MONG_DB_URL;
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Successfully connected . to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(() => {
        console.log('Cannot connect to MongoDB');
    });
app.post('/create',async(req,res)=>{
    if(!req.body.name){
        return res.json({messege:"wite something"})
    }
    const newmode=new myModel({
        name:req.body.name
    });
    await newmode.save();
    res.json({messege:"Created"});

})
app.get('/',async(req,res)=>{
    const all =await myModel.find({});
    res.send({data:all})

})



