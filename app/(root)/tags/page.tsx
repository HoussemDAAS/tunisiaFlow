import TagsCard from "@/components/Cards/TagsCard";
import NoResults from "@/components/shared/NoResults";
import Filter from "@/components/shared/Search/Filter";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAlltags } from "@/lib/actions/tag.actions";
import Link from "next/link";

const page = async () => {
  const tags = await getAlltags({});
  return (
    <>
      <div className="flex w-full flex-col-reverse  justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Tags</h1>
      </div>
      <div className="mt-11 flex justify-between max-sm:flex-col sm:items-center gap-2">
        <LocalSearch
          route="/tags"
          iconPostion="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses=" max-md:flex"
        />
      </div>
      <div className="mt-5 flex w-full flex-wrap justify-center  flex-row items-center  gap-8   max-sm:flex-col p-5">
        {tags!.tags.length > 0 ? (
          tags!.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <section className="background-light900_dark200 flex flex-col dark:border-none rounded-xl   max-xs:min-w-full xs:w-[260px] p-4 border">
                <div className="background-light800_dark400 w-fit rounded-md py-1.5 px-5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </section>
            </Link>
          ))
        ) : (
          <NoResults
            title={"No tags Found"}
            description={""}
            link={"/ask"}
            linkTitle={"ask a question"}
          />
        )}
      </div>
    </>
  );
};
export default page;
