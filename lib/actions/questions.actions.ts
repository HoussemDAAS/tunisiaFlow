"use server";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionParams,
} from "@/components/shared/interface/shared";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { connect } from "http2";

export async function getQuestions(params: GetQuestionParams) {
  try {
    connectToDB();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return {
      questions,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDB();
    const { questionId } = params;
    const question=await Question.findById(questionId)
    .populate({ path: "tags", model: Tag ,select : '_id name'})
    .populate({ path: "author", model: User,select : '_id clerkId name picture'})

    return question;
  } catch (error) {
    
  }
}



export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDB();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({ title, content, author });

    const tagDocuments = [];
    for (const tag of tags) {
      const tagExists = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp("^" + tag + "$", "i") },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(tagExists._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    // Call onError callback if there's an error
  }
}
