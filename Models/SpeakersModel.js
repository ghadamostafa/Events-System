let mongoose=require("mongoose");

let SpeakerSchema=new mongoose.Schema({
    _id:Number,
    FullName:String,
    UserName:String,
    Password:String,
    Address:{City:{type:String,required:true},Street:{type:Number},Building:{type:Number}}
});

let Speaker=mongoose.model("Speakers",SpeakerSchema);

module.exports=Speaker;