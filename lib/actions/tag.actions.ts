"use server";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "@/components/shared/interface/shared";
import Tag from "../models/tag.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";



export async function GetTopInteractedTags(params:GetTopInteractedTagsParams) {
    try {
        connectToDB();
        const {userId} = params;
        const  user= await User.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        // const tags = await Tag.find({user:userId}).limit(limit);
        return ['tag1','tag2','tag3'];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAlltags(params:GetAllTagsParams){

    try {
        connectToDB();
        // const {page,pageSize,filter,searchQuery} = params;
        const tags=await Tag.find({}).sort({ createdAt: -1 });
        return {tags};
    } catch (error) {
        console.log(error);
    }
}