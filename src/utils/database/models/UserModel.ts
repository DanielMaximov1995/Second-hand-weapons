import mongoose from "mongoose";
import {UserModelType} from "@/types/Models";

const UserModel = new mongoose.Schema<UserModelType>({
    fName : { type : String },
    lName : { type : String },
    fullName : { type : String },
    password : { type : String },
    email : { type : String , unique : true , required : true},
    role : { type : String , enum: ["admin", "user"] ,  default: "user" },
    phone : { type : String},
},{timestamps : true});

export default mongoose.models?.users ||
mongoose.model("users", UserModel);
