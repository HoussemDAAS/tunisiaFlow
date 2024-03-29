import QuestionCard from "@/components/Cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/Search/Filter";
import HomeFilters from "@/components/shared/Search/HomeFilters";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/questions.actions";


import Link from "next/link";


export default async function Home() {

 const result= await getQuestions({});

 return (
    <>
      <div className="flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Link href="/ask" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
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
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            <NoResults title={"There's no question to show"} description={" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Getinvolved! 💡"} link={'/ask'} linkTitle={'Ask a Question'}/>
          )}
        
      </div>
    </>
  );
}
