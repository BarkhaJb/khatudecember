import mongoose from "mongoose";

//Defining Schema
const eventSchema = new mongoose.Schema({
   date:{type:String},
   place:{type:String},
   address:{type:String}, 
   time:{type:String} 
},
{timestamps:true})

//Model
const EventModel = mongoose.model("event", eventSchema);

export default EventModel;