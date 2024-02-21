import Image from "next/image";
import React from "react";

const RightSideBar = () => {
  return (
    <div
      className='h-screen background-light900_dark200 sticky light-boder top-0 left-0
    lg:w-[350px] max-xl:hidden p-6 pt-30 shadow-light-300 dark:shadow-none flex 
     flex-col  overflow-y-auto border-r dark:border-none custom-scrollbar"'
    >
      <div className="flex flex-col gap-7">
        <h3 className="h3-bold text-dark100_light900">Top Questions</h3>
        <div className="flex flex-row gap-5 justify-between text-left">
          <p className="body-medium text-dark300_light900 flex-start"> Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
          <Image src="/assets/icons/arrow-right.svg" width={20} height={20} alt="arrow-right" className="invert-colors"/>
        </div>
        <div className="flex flex-row gap-5 justify-between text-left">
          <p className="body-medium text-dark300_light900 flex-start"> Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
          <Image src="/assets/icons/arrow-right.svg" width={20} height={20} alt="arrow-right" className="invert-colors"/>
        </div>
        <div className="flex flex-row gap-5 justify-between text-left">
          <p className="body-medium text-dark300_light900 flex-start"> Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?</p>
          <Image src="/assets/icons/arrow-right.svg" width={20} height={20} alt="arrow-right" className="invert-colors"/>
        </div>
        <div className="flex flex-col  justify-between text-left mt-[4rem] ">
        <h3 className="h3-bold text-dark100_light900">Top Questions</h3>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
