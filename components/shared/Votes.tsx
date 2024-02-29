"use client";
import { AnswerDownVote, AnswerVotes } from "@/lib/actions/Answer.action";
import { QuestionDownVote, QuestionVote } from "@/lib/actions/questions.actions";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import React from "react";

interface prop {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasDownVoted: boolean;
  hasSaved: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasDownVoted,
  hasSaved,
}: prop) => {

 const pathname=usePathname();

    const handleVote = async (voteType: string) => {
if(!userId){
  redirect('/sign-in');
}
     if(voteType === 'upvote'){
        if(type === 'question'){
      
            await QuestionVote({ questionId:JSON.parse(itemId),
                userId:JSON.parse(userId),
                hasupVoted,
                hasdownVoted:hasDownVoted,
                  path:pathname
                })
               }else if(type === 'answer'){
               await AnswerVotes({
                answerId:JSON.parse(itemId),
                userId:JSON.parse(userId),
                hasupVoted,
                hasdownVoted:hasDownVoted,
                path:pathname
               })
               }
     }else if(voteType === 'downvote'){
        if(type === 'question'){
      
            await QuestionDownVote({ questionId:JSON.parse(itemId),
                userId:JSON.parse(userId),
                hasupVoted,
                hasdownVoted:hasDownVoted,
                  path:pathname
                })
               }else if(type === 'answer'){
             const answerDown= await AnswerDownVote({
                answerId:JSON.parse(itemId),
                userId:JSON.parse(userId),
                hasupVoted,
                hasdownVoted:hasDownVoted,
                path:pathname
              })
            console.log(answerDown);
     }
        
          
        
       
    }}
    const handleSave = async () => {
        
    }
  return (
    <div className="flex flex-row gap-3 sm:gap-2 items-center ">
      <Image
        src={
          hasupVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"
        }
        width={15}
        height={15}
        alt="upvote"
       
        style={{ width: "15px", height: "15px", objectFit: "contain" }}
        onClick={() => handleVote('upvote')}
      />
      <p className="subtle-medium background-light700_dark400 p-1  text-dark400_light800 rounded-sm">
        {!upvotes ? 0 : formatNumber(upvotes)}
      </p>
      <Image
        src={
          hasDownVoted
            ? "/assets/icons/downvoted.svg"
            : "/assets/icons/downvote.svg"
        }
        width={15}
        height={15}
        alt="upvote"
        
        style={{ width: "15px", height: "15px", objectFit: "contain" }}
        onClick={() => handleVote('downvote')}
      />
      <p className="subtle-medium background-light700_dark400 p-1  text-dark400_light800 rounded-sm">
        {!downvotes ? 0 : formatNumber(downvotes)}
      </p>
      {type==='question' &&<Image
        src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
        width={15}
        height={15}
        alt="upvote"
        
        style={{ width: "15px", height: "15px", objectFit: "contain" }}
        onClick={() => handleSave()}
      />}
    </div>
  );
};

export default Votes;
