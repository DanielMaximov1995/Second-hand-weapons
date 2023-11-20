import mongoose from "mongoose";
import {BrandTypeModel} from "@/types/Models";

const BrandModel = new mongoose.Schema<BrandTypeModel>({
    name : { type : String},
    models : [{ type : String }]
},{timestamps : true});

export default mongoose.models?.brand ||
mongoose.model("brand", BrandModel);

