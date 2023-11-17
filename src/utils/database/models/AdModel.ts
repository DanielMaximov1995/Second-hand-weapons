import mongoose from "mongoose";
import {AdModelType} from "@/types/Models";

const AdModel = new mongoose.Schema<AdModelType>({
    slug : { type : String},
    title : { type : String},
    description : { type : String},
    media : [{
        url: { type : String},
        fileName: { type : String},
    }],
    sellerName : { type : String},
    sellerPhone : { type : String},
    userSaved : [{ type : String}],
    pistolBrand : { type : String},
    pistolModel : { type : String},
    timeWithMe : {type : Number},
    city : { type : String},
    store : { type : String},
    price : {type : Number},
    sold : { type : Boolean , default : false }
},{timestamps : true});

export default mongoose.models?.ads ||
mongoose.model("ads", AdModel);

