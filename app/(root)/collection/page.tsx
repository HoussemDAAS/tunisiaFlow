import QuestionCard from '@/components/Cards/QuestionCard'
import NoResults from '@/components/shared/NoResults'
import Filter from '@/components/shared/Search/Filter'
import LocalSearch from '@/components/shared/Search/LocalSearch'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const {userId }=auth();
    if(!userId){
        redirect("/sign-in")
    }
    const result= await getSavedQuestions({clerkId:userId})
  return (
    <>
    <div className="flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      
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
        filters={QuestionFilters}
        otherClasses="min-h-[56px] sm:min-w-[170px]"
        containerClasses="max-md:flex"
      />
    </div>

    <div className="mt-10 flex w-full flex-col gap-6">
      {result.questions.length > 0 ? (
        result.questions.map((question:any) => (
             <QuestionCard 
             key={question._id}
             _id={question._id}
             title={question.title}
             tags={question.tags}
             author={question.author}
             upvotes={question.upvotes}
             views={question.views}
             answers={question.answers}
             createdAt={question.createdAt}
             /> ))
        ): (
          <NoResults title={"No saved questions"} description={"it appears that you don't have any saved questions"} link={'/'} linkTitle={'Explore Questions'}/>
        )} 
      
    </div>
  </>
  )
}

export default page
