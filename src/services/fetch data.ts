'use server'
import {dbConnect} from "@/utils/database/db";
import UserModel from "@/utils/database/models/UserModel";
import AdModel from "@/utils/database/models/AdModel";
import {AdModelType, UserModelType} from "@/types/Models";


dbConnect()

export const getAllUsers = async () => {
    return UserModel.find().maxTimeMS(15000)
}

export const getUserByEmail = async (email : string) => {
    return UserModel.findOne({email}).maxTimeMS(15000)
}

export const addNewUser = async (data: UserModelType) => {
    try {
        const newUser = await UserModel.create(data);
        return { ad : newUser, message : 'התווסף בהצלחה' };
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export const editUser = async ( slug : string , data: UserModelType) => {
    try {
        const editUser = await UserModel.findOneAndUpdate({slug} , data);
        return { ad : editUser, message : 'התעדכן בהצלחה' };
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async ( email : string) => {
    try {
        return UserModel.findOneAndDelete({email});
    } catch (error) {
        throw error;
    }
};

export const getAllAds = async () => {
    return AdModel.find().maxTimeMS(15000)
}

export const getAdBySlug = async (slug : string) => {
    return AdModel.findOne({slug}).maxTimeMS(15000)
}

export const addNewAd = async (data: AdModelType) => {
    try {
        const newAd = await AdModel.create(data);
        return { ad : newAd, message : 'התווסף בהצלחה' };
    } catch (error) {
        throw error;
    }
};

export const editAd = async ( slug : string , data: AdModelType) => {
    try {
        const editAd = await AdModel.findOneAndUpdate({slug} , data);
        return { ad : editAd, message : 'התעדכן בהצלחה' };
    } catch (error) {
        throw error;
    }
};

export const deleteAd = async ( slug : string , data: AdModelType) => {
    try {
        return AdModel.findOneAndDelete({slug});
    } catch (error) {
        throw error;
    }
};