import mongoose from "mongoose";

//Defining Schema
const newreleasesSchema = new mongoose.Schema({
    artist:{type:String},
    track:{type:String},
    duration:{type:String},
    image:{type:String},
    song:{type:String}
},
{timestamps:true})

//Model
const NewReleasesModel = mongoose.model("newreleases", newreleasesSchema);

export default NewReleasesModel;