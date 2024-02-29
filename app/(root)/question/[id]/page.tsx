import Answer from "@/components/Forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHtml from "@/components/shared/ParseHtml";
import RenderTag from "@/components/shared/Search/RenderTag";
import { getQuestionById } from "@/lib/actions/questions.actions";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ questionId: params.id });
  const {userId :clerkId}=auth();
if(!clerkId) redirect('/sign-in');
  let user;
  if(clerkId){
    user=await getUserById({userId :clerkId});
  }
  
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt={question.author.name}
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700 gap-1 line-clamp-1 ml-2">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes 
            type="question"
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(user?._id)}
            upvotes={question.upvotes.length}
            downvotes={question.downvotes.length}
            hasupVoted={question.upvotes.includes(user?._id)}
            hasDownVoted={question.downvotes.includes(user?._id)}
            hasSaved={user.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
      <Metric
          imagUrl="/assets/icons/clock.svg"
          alt="Clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title="  Asked"
          textStyles="small-medium text-dark400_light800"
        />
                <Metric
          imagUrl="/assets/icons/message.svg"
          alt="Message"
          value={formatNumber(question.answers.length)}
          title="  Message"
          textStyles="small-medium text-dark400_light800"
        />
                      <Metric
          imagUrl="/assets/icons/eye.svg"
          alt="view"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHtml data={question.content} />

      <div className="mt-8 flex  gap-2 flex-wrap">
        {question.tags.map((tag:any) => (
          <RenderTag key={tag._id} name={tag.name} _id={tag._id} showCount={false} />
        ))}
        </div>
          <AllAnswers  questionId={question._id} userId={user?._id} totalAnswers={question.answers.length}/>

        <Answer mongoUserId={JSON.stringify(user._id)} questionId={JSON.stringify(question._id)} />
    </>
  );
};

export default page;
