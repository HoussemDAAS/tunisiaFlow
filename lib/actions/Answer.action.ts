"use server";


import { connectToDB } from "../mongoose";
import Answer from "../models/Answer.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import { CreateAnswerParams } from "@/components/shared/interface/shared";






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