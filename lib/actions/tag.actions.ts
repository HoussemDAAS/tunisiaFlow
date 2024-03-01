"use server";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "@/components/shared/interface/shared";
import Tag, { ITag } from "../models/tag.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { FilterQuery } from "mongoose";
import Question from "../models/question.model";



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
export async function GetQuestionsByTagId(params:GetQuestionsByTagIdParams)
{
    try {
        connectToDB();
        const { tagId, searchQuery } = params;
      
          
        const tag = await Tag.findOne({ _id: tagId}) .populate({
          path: 'questions',
          model: Question,
          match: searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {},
          options: {
            sort: { createdAt: -1 },
          },
          populate: [
            { path: 'author', model: User, select: '_id clerkId name picture' },
            { path: 'tags', model: Tag, select: '_id name' },
          ],
        });
  
       if(!tag){

        throw new Error("Tag not found");
       }
       const questions = tag.questions
       return { tagTtile:tag.name,questions};
      } catch (error) {
        console.log(error);
        throw error;
      }
}