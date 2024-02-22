import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
interface props {
    title:string;
    description:string;
    link:string,
    linkTitle:string
}
const NoResults = ({title, description,link,linkTitle}:props) => {
  return (
    <div className="mt-10 w-full flex flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.svg"
        width={270}
        height={200}
        className="block object-contain w-[270px] h-[200px]"
        alt="no Results"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
       {description}
      </p>
      <Link href={link} className="flex">
          <Button className="bg-primary-500 min-h-[46px] px-4 py-3 !text-light-900 mt-5">
            {linkTitle}
          </Button>
        </Link>
    </div>
  );
};

export default NoResults;
