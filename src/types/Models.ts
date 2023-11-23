import {Types} from "mongoose";

export type ObjectIdType = Types.ObjectId | string | undefined;

export type UserModelType = {
    _id?: ObjectIdType;
    fName : string;
    lName ?: string;
    fullName : string;
    email : string,
    password : string,
    role ?: "admin" | "user",
    phone ?: string,
}

export type AdModelType = {
    _id?: ObjectIdType;
    slug ?: string;
    title : string;
    description ?: string;
    media : {
        _id ?: ObjectIdType;
        url : string;
        fileName : string;
    }[];
    sellerName : string;
    sellerPhone : string;
    userSaved ?: string[];
    pistolBrand : string;
    pistolModel : string;
    timeWithMe : number;
    city : string;
    store : string;
    price : number;
    sold ?: boolean;
}

export type ModelType = {
    _id?: ObjectIdType;
    name ?: string
}

export type BrandTypeModel = {
    _id?: ObjectIdType;
    name : string;
    models ?: ModelType[];
}