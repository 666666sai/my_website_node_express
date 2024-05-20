const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://666666sai:oFr05Q1Jbz871INI@cluster0.rsbdzho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>console.log("db connected")
).catch(err=>console.log(err))
const credits=mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})
module.exports=new mongoose.model('users',credits)