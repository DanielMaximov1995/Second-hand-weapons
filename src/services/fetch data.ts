'use server'
import {dbConnect} from "@/utils/database/db";
import UserModel from "@/utils/database/models/UserModel";
import AdModel from "@/utils/database/models/AdModel";
import {AdModelType, UserModelType} from "@/types/Models";
import bcrypt from "bcryptjs";

dbConnect()

export const getAllUsers = async () => {
    let data = await UserModel.find().maxTimeMS(15000)
    return JSON.parse(JSON.stringify(data))
}

export const getUserByEmail = async (email : string) => {
    let data = await UserModel.findOne({email}).maxTimeMS(15000)
    return JSON.parse(JSON.stringify(data))
}

export const addNewUser = async (data: UserModelType) => {
    try {
        let emailExist = await UserModel.findOne({email : data.email.toLowerCase()})
        if(emailExist) {
            throw Error('אימייל זה קיים...')
        }

        let password = await bcrypt.hash(data.password, 10)

        const newUser = await UserModel.create({
            ...data,
            email : data.email.toLowerCase(),
            password
        });

        return JSON.parse(JSON.stringify({ newUser, message : 'התווסף בהצלחה' , success : true }))
    } catch (error) {
        throw error;
    }
};

export const editUser = async ( slug : string , data: UserModelType) => {
    try {
        const editUser = await UserModel.findOneAndUpdate({slug} , data);
        return JSON.parse(JSON.stringify({ editUser, message : 'התעדכן בהצלחה' }));
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async ( email : string) => {
    try {
        let data = await UserModel.findOneAndDelete({email})
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        throw error;
    }
};

export const getAllAds = async () => {
    let data = await AdModel.find().maxTimeMS(15000)
    return JSON.parse(JSON.stringify(data))
}

export const getAdBySlug = async (slug : string) => {
    let data = await AdModel.findOne({slug}).maxTimeMS(15000)
    return JSON.parse(JSON.stringify(data))
}

export const addNewAd = async (data: AdModelType) => {
    try {
        const newAd = await AdModel.create(data);
        return JSON.parse(JSON.stringify({ newAd, message : 'מודעה נוצרה בהצלחה' }))
    } catch (error) {
        throw error;
    }
};

export const editAd = async ( slug : string , data: AdModelType) => {
    try {
        const editAd = await AdModel.findOneAndUpdate({slug} , data);
        return JSON.parse(JSON.stringify({ ad : editAd, message : 'המודעה התעדכנה בהצלחה' }));
    } catch (error) {
        throw error;
    }
};

export const deleteAd = async ( slug : string , data: AdModelType) => {
    try {
        await AdModel.findOneAndDelete({slug})
        return JSON.parse(JSON.stringify({message : 'המודעה נמחקה בהצלחה !'}));
    } catch (error) {
        throw error;
    }
};