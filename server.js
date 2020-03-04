let express=require("express");
let mongoose=require("mongoose");
let path=require("path");
let AuthRoutes=require("./Routes/AuthRoutes");
let SpeakerRoutes=require("./Routes/SpeakerRoutes");
let AdminRoutes=require("./Routes/AdminRoutes");
let EventsRoutes=require("./Routes/EventsRoutes");
let profileRoutes=require("./Routes/profileRoutes");
let session=require("express-session");
const server=express();

server.listen(8082,()=>{
    console.log("server listening");
})

//Views
server.set('view engine', 'ejs');
server.set("views",path.join(__dirname,"Views"));

//db connection
mongoose.connect("mongodb://localhost:27017/EventsDB")
.then(()=>{console.log("connect to database")})
.catch((error)=>{console.log(error+"")})

//Middleware
server.use(function(request,response,next){
    console.log(request.url,request.method);
    next();
});

//Home
server.get("/home",function(request,response){
    response.render("Home/home");
})

server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(session({secret: 'secretkey',saveUninitialized: true,resave:false}));

//Authentication
server.use(AuthRoutes);

server.use(function(request,response,next){
    if(request.session.name)
    {
        response.locals.name=request.session.name;
        next();
    }
    else
    {
        response.redirect("/Login");
    }
});


server.use("/speaker",profileRoutes);

//Speaker Router
server.use("/speakers",SpeakerRoutes);

//Admin Router
server.use("/admin",AdminRoutes);

//Events Router
server.use("/events",EventsRoutes)

//for not registered routes
server.use(function(request,response){
    console.log("Welcome");
});