let mongoose=require("mongoose");

let EventSchema=new mongoose.Schema({
    _id:Number,
    title:{type:String,required:true},
    eventDate:Date,
    mainSpeaker:{type:Number,ref:"Speakers"},
    otherSpeakers:[{type:Number,ref:"Speakers"}]
});

let Event=mongoose.model("Events",EventSchema);

module.exports=Event;