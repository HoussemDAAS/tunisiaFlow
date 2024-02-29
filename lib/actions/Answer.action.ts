"use server";


import { connectToDB } from "../mongoose";
import Answer from "../models/Answer.model";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "@/components/shared/interface/shared";
import { connect } from "http2";






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

export async function AnswerVotes(params:AnswerVoteParams){
try {
    connectToDB();
    const { userId, answerId, path,hasupVoted,hasdownVoted } = params;
    let updateQuery={};
    if(hasupVoted){
        updateQuery={$pull:{upvotes:userId}}
      }else if(hasdownVoted){
        updateQuery={$push:{upvotes:userId},
        $pull:{downvotes:userId}}
      }else {
        updateQuery={$addToSet:{upvotes:userId}}
      }
      const answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true})
      if(!answer) throw new Error('Question not found');
// increment author's reputation

revalidatePath(path);
} catch (error) {
    console.log(error);
}
}
export async function AnswerDownVote(params:AnswerVoteParams) {
    try {
      connectToDB();
      const { userId, answerId, path,hasupVoted,hasdownVoted } = params;
      let updateQuery={};
      if(hasdownVoted){
        updateQuery={$pull:{downvotes:userId}}
      }else if(hasupVoted){
        
        updateQuery={
          $pull:{upvotes:userId},
          $push:{downvotes:userId}
        }
      }else {
        updateQuery={$addToSet:{downvotes:userId}}
      }
      const answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true})
      if(!answer) throw new Error('Question not found');
  
  // increment author's reputation
  
  
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
    }
  }