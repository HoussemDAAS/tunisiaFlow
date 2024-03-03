import { getUserById, getUserInfo } from "@/lib/actions/user.actions";
import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatDate } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserInfo(params.id);
  const { userId: clerkId } = auth();
  const userJoinedAt = user?.user.joinedAt; // Assuming user?.user.joinedAt is a valid date string or Date object
  const formattedDate = userJoinedAt ? formatDate(userJoinedAt) : "";

  return (
    <div className="flex flex-col gap-6 sm:gap-3">
      <div className="flex flex-col-reverse  justify-between   max-sm:flex-row">
        <div className="flex flex-col gap-4  items-start lg:flex-row">
          <Image
            src={user?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col gap-3 sm:gap-1 items-start mt-3">
            <h2 className="h2-bold text-dark300_light900">{user?.user.name}</h2>
            <p className="body-regular text-dark300_light900">
              @{user?.user.username}
            </p>

            <div className="flex flex-row mt-3 gap-3 items-center justify-start">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
                className=""
              />
              <p className="paragraph-semibold text-dark300_light900">
                Joined: {formattedDate}{" "}
              </p>
              {user?.user.bio && (
                <p className="paragraph-semibold text-dark300_light900">
                  {user?.user.bio}
                </p>
              )}
            </div>
            <div className="flex flex-wrap justify-start gap-5 items-center"></div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === user?.user.clerkId ? (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            ) : null}
          </SignedIn>
        </div>
      </div>
      States
      <div className="mt-9 flex gap-10">
        <Tabs defaultValue="Top-posts" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
