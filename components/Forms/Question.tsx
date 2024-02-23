"use client";
import { z } from "zod";
//@ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validation";


const Question = () => {
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Question title <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input  {...field} className="no-focus paragraph-regular background-light900_dark300  light-border-2 text-dark300_light700 min-h-[56px] border" />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Ask any question you want to share with the community.
              </FormDescription>
              <FormMessage  className="text-red-500"/>
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">Detail explanation of your problem <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                {/* <Input  {...field} className="no-focus paragraph-regular background-light700_dark300  light-border-2 text-dark300_light700 min-h-[56px] border" /> */}
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
           Introduce yhe problem in detail and provide as much information as possible.
              </FormDescription>
              <FormMessage  className="text-red-500"/>
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">Tags <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input  placeholder="add tags" {...field} className="no-focus paragraph-regular background-light900_dark300  light-border-2 text-dark300_light700 min-h-[56px] border" />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
               Add up to 5 tags to describe your question.
              </FormDescription>
              <FormMessage  className="text-red-500"/>
            </FormItem>
            
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Question;
