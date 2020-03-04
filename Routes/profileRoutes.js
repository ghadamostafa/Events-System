let express=require("express");
let mongoose=require("mongoose");
let profileRoutes=express.Router();
let EventSchema=require("../Models/EventsModel");
let SpeakerSchema=require("../Models/SpeakersModel");

let SpeakerModel=mongoose.model("Speakers");

profileRoutes.use(function(request,response,next){
    if(request.session.role == "speaker")
    {
        next();
    }
    else
    {
        response.send("you are not allowed to access this page");
    }
});
profileRoutes.get("/profile",function(request,response){
    id=request.session._id;
    console.log(id);
    EventSchema.find({$or : [{mainSpeaker:request.session._id},{otherSpeakers:request.session._id}]})
    .then((Data)=>{console.log(Data);
        response.render("Speakers/profile",{"data":Data,"_id":request.session._id});
    })
    .catch((error)=>{console.log(error+"")})
    
});
profileRoutes.get("/Editprofile",function(request,response){
    SpeakerModel.find({_id:request.session._id}).then((Data)=>{
        response.render("Speakers/editProfile",{"data":Data});
    })
    .catch((error)=>{console.log(error+"")})
});
profileRoutes.post("/Editprofile",function(request,response){
    SpeakerModel.updateOne({_id:request.session._id},{$set:{UserName:request.body.UserName,Password:request.body.Password,FullName:request.body.FullName,"Address.City":request.body.City,"Address.Street":request.body.Street,"Address.Building":request.body.Building}}).then((Data)=>{
        response.redirect("/speaker/profile");
    })
    .catch((error)=>{console.log(error+"")})
});

module.exports=profileRoutes;