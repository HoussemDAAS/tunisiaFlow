"use server"

import Interaction from "../models/Interaction.model";
import Question from "../models/question.model";
import { connectToDB } from "../mongoose";

export async function viewQuestion(params: any) {
    try {
       await  connectToDB();
        const { questionId, userId   } = params;
       await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
       if(userId){
        const exist = await Interaction.findOne({user:userId,question:questionId,action:'view'})
        if(!exist){
            await Interaction.create({user:userId,question:questionId,action:'view'})
        }
       }
    } catch (error) {
        console.log(error);
        throw error;
    }
}