"use server";


import { connectToDB } from "../mongoose";
import Answer from "../models/Answer.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import { CreateAnswerParams, GetAnswersParams } from "@/components/shared/interface/shared";






export async function createAnswer(params: CreateAnswerParams)
{

    try {
        connectToDB();
        const {content,author,question,path} = params;
        const answer= new  Answer({content,author,question});
       await Question.findByIdAndUpdate(question,{$push:{answers:answer._id}});

        await answer.save();

        revalidatePath(path);

    } catch (error) {
        console.log(error);
    }


}

export async function getAnswers(params:GetAnswersParams){

    try {
        connectToDB();
        const {questionId} = params;
        const answers = await Answer.find({question:questionId}).populate("author",'_id clerkId name picture')
        .sort({createdAt:-1});
        return {answers};
        
    } catch (error) {
        console.log(error);
    }
}