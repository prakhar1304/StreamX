import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
 
    videoFile:{
        type: String,
        require: true,
    },
    thumNail:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    duration:{
        type: Number, //from  cloudnary
        default: 0 , 
    },
    isPublished:{
        type:Boolean,
        default: true,
        //for  public and  privaet video
    },
    owner:{
        type:  Schema.Types.objectid,
        ref:"User"
    }

},{timeseries:true})

//mongoos  provide  us  with the lot of pulgin -->khud ka middleware
//pre --> just   before data save  kuch karo , post --. after

//mongoss  also  help us  to injucet  our own plugin
videoSchema.plugin(mongooseAggregatePaginate)
//we  can  write  here  queery  related  to  aggraigation

//aggraigation pipeline --> data  goes  through  multiple  stages ( filtering, grouping, and sorting)
export const  Video =  mongoose.model("Video",videoSchema)