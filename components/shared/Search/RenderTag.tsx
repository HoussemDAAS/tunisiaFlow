import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
interface props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  otherClasses?: string
}
const RenderTag = ({ _id, name, totalQuestions, showCount,otherClasses}: props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        className={`subtle-medium background-light800_dark300 text-light400_light500 rounded-md
border-none px-4 py-2 uppercase ${otherClasses}`}   
      >
        {name}
      </Badge>
      {showCount && (
        <span className="small-medium text-dark500_light700">{totalQuestions}</span>
      )}
    </Link>
  );
};

export default RenderTag;
