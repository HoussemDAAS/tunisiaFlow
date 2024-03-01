
"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  SaveQuestionParams,
  UpdateUserParams,
  getSavedQuestionsParams,
} from "@/components/shared/interface/shared";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import { type } from "os";
import { FilterQuery } from "mongoose";
import Tag from "../models/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParam: CreateUserParams) {
  try {
    connectToDB();
    const newUser = await User.create(userParam);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userParam: UpdateUserParams) {
  try {
    connectToDB();

    const { clerkId, updateData, path } = userParam;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Retrieve question IDs associated with the user (not used)
    // const userQuestionId = await Question.find({ author: clerkId }).distinct("_id");

    // Delete questions associated with the user
    await Question.deleteMany({ author: user._id });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getAllUsers(params:GetAllUsersParams) {
  try {
    connectToDB();
    // const { page=1, pageSize=20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return {users};


  }catch(error){
    console.log(error);
    throw error
  }
}

export async function SaveQuestion (params:SaveQuestionParams){
  try {
    connectToDB();
    const { questionId, userId, path } = params;

    let updateQuery={};
 const user= await User.findById(userId);

 const isSaved=user.saved.includes(questionId);
 if(isSaved){
   updateQuery={$pull:{saved:questionId}}
    const save = await User.findByIdAndUpdate(userId,updateQuery,{new:true})
 }else  {
  updateQuery={$addToSet:{saved:questionId}}
    const save = await User.findByIdAndUpdate(userId,updateQuery,{new:true})
  }

  revalidatePath(path);
  } catch (error) {
    console.log(error);
    
  }
}
export async function getSavedQuestions(params: getSavedQuestionsParams) {
  try {
    connectToDB();
    const { clerkId, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'author', model: User, select: '_id clerkId name picture' },
        { path: 'tags', model: Tag, select: '_id name' },
      ],
    });
   if(!user){
    throw new Error("User not found");
   }
   const savedQuestions = user.saved;
   return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
