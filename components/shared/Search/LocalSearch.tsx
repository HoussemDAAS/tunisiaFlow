"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
interface CustomInputsProps{
    route:string,
    iconPostion:string,
    imgSrc:string,
    placeholder:string,
    otherClasses?:string
}
const LocalSearch = ({
  route,
  iconPostion,
  imgSrc,
  placeholder,
  otherClasses,
}:CustomInputsProps) => {
  return (
   
      <div className={`background-light800_darkgradient relative flex  min-h-[56px] rounded-xl grow items-center gap-1 px-4 ${otherClasses}`}>
        {iconPostion === "left" && <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />}
        <Input
          type="text"
          placeholder={placeholder}
          value=''
          onChange={()=>{}}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    
  );
};

export default LocalSearch;
