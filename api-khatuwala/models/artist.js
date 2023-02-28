import mongoose from "mongoose";

//Defining Schema
const artistSchema = new mongoose.Schema({
   artist:{type:String}, 
   image:{type:String} 
},
{timestamps:true})

//Model
const ArtistModel = mongoose.model("artist", artistSchema);

export default ArtistModel;