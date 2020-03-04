let express=require("express");
let mongoose=require("mongoose");
let SpeakerSchema=require("../Models/SpeakersModel");

let SpeakerRoutes=express.Router();
let SpeakerModel=mongoose.model("Speakers");

SpeakerRoutes.use(function(request,response,next){
    if(request.session.role == "admin")
    {
        next();
    }
    else
    {
        response.send("you are not allowed to access this page");
    }
});
SpeakerRoutes.get("/list",function(request,response){
    SpeakerModel.find({})
    .then((Data)=>{console.log(Data)
        response.render("Speakers/list",{data:Data});
    })
    .catch((error)=>{console.log(error+"")})
})

// SpeakerRoutes.get("/add",function(request,response){

//     response.send("add Page,get");
// })

// SpeakerRoutes.post("/add",function(request,response){
//     let newSpeaker=new SpeakerSchema(request.body)
//     newSpeaker.save().then((Data)=>{console.log(Data)}).catch((error)=>{console.log(error+"")})
//     response.send("add Page,post");
// })

SpeakerRoutes.get("/edit/:id",function(request,response){
    SpeakerModel.find({_id:request.params.id})
    .then((Data)=>{
        response.render("Speakers/edit",{data:Data});
    })
    .catch((error)=>{
        console.log(error+"")
    })   
})

SpeakerRoutes.post("/edit",function(request,response){
    console.log(request.body)
    SpeakerModel.updateOne({_id:request.body.ID},{$set:{FullName:request.body.FullName,"Address.City":request.body.City,"Address.Street":request.body.Street,"Address.Building":request.body.Building}})
    .then(()=>{console.log("successful");
    response.redirect("/speakers/list");
    })
    .catch((error)=>{console.log(error+"")})
    
})

SpeakerRoutes.post("/delete",function(request,response){
    console.log("delete")
    console.log(request.body.id);
    SpeakerModel.deleteOne({_id:request.body.id})
        .then(()=>{console.log("deleted successfully")
        response.send({delete:"deleted"})
        })
        .catch((error)=>{console.log(error+"")})
    
})
module.exports=SpeakerRoutes;
