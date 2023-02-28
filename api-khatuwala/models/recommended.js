import mongoose from "mongoose";

//Defining Schema
const recommendedSchema = new mongoose.Schema({
    artist:{type:String},
    track:{type:String},
    duration:{type:String},
    image:{type:String},
    song:{type:String}
},
{timestamps:true})

//Model
const RecommendedModel = mongoose.model("recommend", recommendedSchema);

export default RecommendedModel;