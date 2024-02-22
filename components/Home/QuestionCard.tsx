import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import RenderTag from "../shared/Search/RenderTag";
interface props {
  _id: string;
  title: string;
  tags: {
    name: string;
    _id: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: string;
}
const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: props) => {
  return (
    <div className="p-9 sm:px-11 rounded-[12px] card-wrapper">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {createdAt}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
       <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-5 w-full flex-wrap gap-6">

      </div>
    </div>
  );
};

export default QuestionCard;
