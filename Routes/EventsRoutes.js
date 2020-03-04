let express=require("express");
let mongoose=require("mongoose");
let EventSchema=require("../Models/EventsModel");
let speakerSchema=require("../Models/SpeakersModel");
let moment=require("moment");

let EventsRoutes=express.Router();
EventsRoutes.use(function(request,response,next){
    if(request.session.role == "admin")
    {
        next();
    }
    else
    {
        response.send("you are not allowed to access this page");
    }
});
EventsRoutes.get("/list",function(request,response){
    EventSchema.find({}).populate({path:"mainSpeaker otherSpeakers"})
    .then((Data)=>{console.log(Data);
        response.render("Events/listEvents",{data:Data,moment:moment});
    })
    .catch((error)=>{console.log(error+"")})
})

EventsRoutes.get("/add",function(request,response){
    speakerSchema.find({},{UserName:1}).then((Data)=>{
        console.log(Data);
        response.render("Events/addEvent",{data:Data});
    })
    .catch((error)=>{console.log(errot+"");
    })
    
})

EventsRoutes.post("/add",function(request,response){
    console.log(request.body)
    let newEvent=new EventSchema(request.body)
    newEvent.save().then((Data)=>{console.log(Data)}).catch((error)=>{console.log(error+"")})
    response.redirect("/events/list");
})

EventsRoutes.get("/edit/:id",function(request,response){
    EventSchema.find({_id:request.params.id}).populate({path:"mainSpeaker otherSpeakers"})
    .then((Data)=>{console.log(Data);
        speakerSchema.find({},{UserName:1}).then((Data2)=>{
            console.log(moment);
            Data.userNames=Data2;
            response.render("Events/editEvent",{data:Data,moment:moment});
        })
        .catch((error)=>{console.log(errot+"");
        })
        
    })
    .catch((error)=>{console.log(error+"")})
})

EventsRoutes.post("/edit",function(request,response){
    EventSchema.update({_id:request.body._id},
        {$set:{title:request.body.title,eventDate:request.body.eventDate,mainSpeaker:request.body.mainSpeaker,otherSpeakers:request.body.otherSpeakers}})
    .then(()=>{console.log("successful");
        response.redirect("/events/list");
    })
    .catch((error)=>{console.log(error+"")})
    
})


EventsRoutes.post("/delete",function(request,response){
    EventSchema.deleteOne({_id:request.body.id})
        .then(()=>{console.log("deleted successfully");
        response.send({delete:"deleted"});
        })
        .catch((error)=>{console.log(error+"")})
    
})

module.exports=EventsRoutes;
