"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
const LeftSideContent = () => {
  const pathname = usePathname();
  return (
    <div className="flex  flex-col gap-6">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
       
            <Link
              key={link.route}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex itmes-center justify-start gap-4 p-4  bg-transparent`}
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
                style={{ width: "20px", height: "20px", objectFit: "contain" }}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden `}>
                {link.label}
              </p>
            </Link>
     
        );
      })}
    </div>
  );
};
const LeftSideBar = () => {
  return (
    <section className="h-screen background-light900_dark200 sticky light-boder top-0 left-0
     lg:w-[266px] max-sm:hidden p-6 pt-30 shadow-light-300 dark:shadow-none flex 
      flex-col  overflow-y-auto border-r dark:border-none custom-scrollbar">
    

        <LeftSideContent />
    
 
      <SignedOut>
      <div className="flex flex-col  gap-3 mt-[8rem]">
            
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image src="/assets/icons/account.svg" width={20} height={20} alt="login" className="invert-colors lg:hidden" style={{ width: "20px", height: "20px", objectFit: "contain" }}/>
                  <span className="primary-text-gradient max-lg:hidden">Sign In</span>
                </Button>
              </Link>
            
            
              <Link href="/sign-up">
                <Button className="small-medium btn-tertiary light-border-lg min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
                <Image src="/assets/icons/sign-up.svg" width={20} height={20} alt="signup" className="invert-colors lg:hidden"style={{ width: "20px", height: "20px", objectFit: "contain" }}/>
                  <p className="max-lg:hidden">Sign up</p> 
                </Button>
              </Link>
            
          </div>
      </SignedOut>

    </section>
  );
};

export default LeftSideBar;
