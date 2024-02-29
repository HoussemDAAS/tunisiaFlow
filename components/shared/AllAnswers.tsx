import React from "react";
import Filter from "./Search/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/Answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHtml from "./ParseHtml";
import Votes from "./Votes";

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
}: {
  questionId: string;
  userId: string;
  totalAnswers: number;
}) => {
  const result = await getAnswers({ questionId });
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between ">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter
          filters={AnswerFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=" max-md:flex"
        />
      </div>
      <div>
        {result!.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between ">
              {/* Span Id*/}

              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt={answer.author.name}
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p>
                      <span className="pl-2 small-regular text-dark400_light500  line-clamp-1 max-sm:hidden">
                        {" "}
                        -answerd {getTimestamp(answer.createdAt)}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
                <div className="flex justify-end mb-8"><Votes type="answer" 
                  itemId={JSON.stringify(answer._id)}  
  userId={JSON.stringify(userId)} 
    upvotes={answer.upvotes.length} 
    downvotes={answer.downvotes.length} 
    hasupVoted={answer.upvotes.includes(userId)} 
    hasDownVoted={answer.downvotes.includes(userId)} 
    hasSaved={false} 
    /></div>
            </div>
              <ParseHtml data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
