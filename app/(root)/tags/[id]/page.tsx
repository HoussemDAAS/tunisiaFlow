
import QuestionCard from "@/components/Cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";

import LocalSearch from "@/components/shared/Search/LocalSearch";

import { GetQuestionsByTagId} from "@/lib/actions/tag.actions";
import { Iquestion } from "@/lib/models/question.model";

const page = async ({ params }: { params: { id: string } }) => {

const result = await GetQuestionsByTagId({ tagId: params.id });
  return (
    <>
      <div className="flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{result.tagTtile}</h1>
      </div>
      <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-2">
        <LocalSearch
          route="/tags"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions"
          otherClasses="flex-1"
        />
     
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
      {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
            <NoResults title={"There's no question Tag related to show"} description={" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Getinvolved! 💡"} link={'/ask'} linkTitle={'Ask a Question'}/>
          )}
      </div>
    </>
  );
};
export default page;
