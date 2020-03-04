let express=require("express");
let AdminRoutes=express.Router();
AdminRoutes.use(function(request,response,next){
    if(request.session.role == "admin")
    {
        next();
    }
    else
    {
        response.send("you are not allowed to access this page");
    }
});
AdminRoutes.get("/profile",function(request,response){
    response.render("Admin/profile");
});


module.exports=AdminRoutes;
