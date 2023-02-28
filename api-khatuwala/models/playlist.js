import mongoose from "mongoose";

//Defining Schema
const playlistSchema = new mongoose.Schema({
   playlist:{type:String},
   title:{type:String},
   image:{type:String} 
},
{timestamps:true})

//Model
const PlaylistModel = mongoose.model("playlist", playlistSchema);

export default PlaylistModel;