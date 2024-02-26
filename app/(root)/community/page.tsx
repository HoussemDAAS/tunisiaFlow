import Filter from "@/components/shared/Search/Filter"
import LocalSearch from "@/components/shared/Search/LocalSearch"
import ProfileCard from "@/components/Cards/ProfileCard"
import { UserFilters } from "@/constants/filters"
import { getAllUsers } from "@/lib/actions/user.actions"
import Link from "next/link"



const  page = async () => {
    const result=await getAllUsers({});
  return (
    <>
    <div className="flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
    </div>
        <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-2">
        <LocalSearch
          route="/"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=" max-md:flex"
        />
      </div>
      <div className="mt-5 flex w-full flex-wrap justify-center  flex-row items-center  gap-8   max-sm:flex-col p-5">
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <ProfileCard  key={user._id} profile={user} />
          ))
        ):
        <div className="pargraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
          <p className="body-medium text-dark100_light900">No user found</p>
          <Link href={"/sign-up"} className="font-bold mt-2 text-accent-blue">
            Join to be the first
          </Link>
        </div>}
        

      </div>
      </>
  )
}

export default page
