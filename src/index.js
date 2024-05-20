const express=require("express");
const paths = require("path");
const bcrypt=require("bcrypt");
const collections=require("./config");
const { name } = require("ejs");
const app= express();


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res)=>{ 
    res.render("login");
})


app.get('/singup', (req,res)=>{
    res.render("singup");
})

app.post('/singup',async (req,res)=>{
    const data={
        username:req.body.username,
        password:req.body.password
    }
    const existinguser= await collections.findOne({username:data.username});
    if(existinguser){
        res.send("user already exist");
    }else{

        const saltrounds=10;
        const hashpaswword=await bcrypt.hash(data.password, saltrounds);
        data.password=hashpaswword;
        const userdata=await collections.insertMany(data);
        console.log(userdata);
        res.send("succefully accoun created");
    }
});

app.post('/Login',async (req,res)=>{
    try{
        const check=await collections.findOne({username:req.body.username});
        if(!check){
            res.send("username doesn't exist");
        }

        const ispassword=await bcrypt.compare(req.body.password, check.password);

        if(ispassword){
              res.render("homepage");
        }else{
        res.send("erong password");
        }
    }catch{
        res.send("wrong redatils")
    }
});

app.listen(3000,()=>{
    console.log("server running")
})