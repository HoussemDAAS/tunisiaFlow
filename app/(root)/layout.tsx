import LeftSideBar from "@/components/shared/Navbar/LeftSideBar";
import Navbar from "@/components/shared/Navbar/Navbar";
import RightSideBar from "@/components/shared/Navbar/RightSideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
     <Navbar/>
      <div className="flex " >
        <LeftSideBar />
        <section className="flex min-h-screen  flex-1 flex-col px-6 pb-6 pt-10 max-sm:pt-10 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
