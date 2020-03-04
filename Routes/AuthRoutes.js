let express=require("express");
let authRoutes=express.Router();
let path=require("path");
let mongoose=require("mongoose");
let SpeakerSchema=require("../Models/SpeakersModel");


authRoutes.get("/Login",function(request,response,next){
    response.render("Authntication/login");
});
authRoutes.post("/Login",function(request,response){
    console.log(request.body);   
    // response.send("login");
    if((request.body.UserName === 'ghada' )&&(request.body.Password === '123'))
    {
        request.session.role="admin";
        request.session.name="ghada";
        console.log("Welcome Admin");
        response.redirect("admin/profile");
    }
    else 
    {
        SpeakerSchema.findOne({UserName:request.body.UserName},{Password:1})
        .then((Data)=>{
            console.log(Data);
        if(Data == null)
        {
            console.log("wrong user name");
            response.redirect("/Login");
        }
        else if(Data.Password == request.body.Password)
        {
            request.session.role="speaker";
            request.session.name=request.body.UserName;
            console.log(Data._id);
            request.session._id=Data._id;
            console.log(request.session._id);
            console.log("Welcome Speaker");
            response.redirect("speaker/profile");
        }
        else
        {
            console.log("wrong password");
            response.redirect("/Login");
        }
        })
        .catch((error)=>{
            console.log(error+"");
        })
    }
});
authRoutes.get("/Register",function(request,response,next){
    response.render("Authntication/Registration");
});
authRoutes.post("/Register",function(request,response){
    console.log(request.body)
    let newSpeaker=new SpeakerSchema({
        _id:request.body.id,
        FullName:request.body.FullName,
        UserName:request.body.UserName,
        Password:request.body.Password,
        Address:{City:request.body.City,Street:request.body.Street,Building:request.body.Building}
    })
    newSpeaker.save().then((Data)=>{console.log(Data)}).catch((error)=>{console.log(error+"")})
    //redirect for profile
    console.log("hi");
    response.redirect("/Login");

});
authRoutes.get("/Logout",function(request,response){
    request.session.destroy();
    response.redirect("/Login");
})
module.exports=authRoutes;