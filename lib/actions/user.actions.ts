
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/components/shared/interface/shared";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";

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
