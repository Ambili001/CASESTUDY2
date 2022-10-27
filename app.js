// Task1: initiate app and run server at 3000
const express = require('express')
const app = new express()
const path=require('path');
const mongoose = require ('mongoose');
const EmpData = require("./models/employee")
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json());
const PORT=3000;
// Task2: create mongoDB connection
mongoose.connect("mongodb+srv://Ambili97:thiruvonum001@cluster0.pkmrzlb.mongodb.net/CASESTUDY2?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDb is connected successfully");
})
.catch((error)=>{
    console.log("Connection error "+error)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
EmpData.find().then(function(data){
    res.send(data)
})

})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/',(req,res)=>{
    EmpData.findOne({"_id":req.params.id}).then(function(data){
        res.send(data)
    })
    
    })
    

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
    let item = req.body;
    const employee = new EmpData(item)
    const savedEmp = await employee.save()
   res.send(savedEmp);
    }
    catch(error){
        res.send(error);

    }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id
app.delete('/api/employeelist/:id',(req,res)=>{
let id=req.params.id;
EmpData.findByIdAndDelete({"_id":id},function(data){
    res.send(data);
})
   
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/',(req,res) => {
    let id =req.body.id;
  let data= {name:req.body.name,
   location:req.body.location,
   position:req.body.position,
    salary:req.body.salary}
    EmpData.findByIdAndUpdate({"_id":Object(id)}, {$set:data},function(data){
        console.log(data);
        res.send(data);
    })
})

   
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log("Server is listening to port 3000")
})

