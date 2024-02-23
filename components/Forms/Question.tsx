"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
//@ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { Badge } from "../ui/badge";
const type: string = "create";
const Question = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue.length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be less than 15 characters",
        });
      }

      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      } else {
        form.trigger();
      }
    }
  };
  const handletagRemove = (tag: string, field: any) => {
    const newtags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newtags);
  };

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
    setSubmitting(true);
    try {
        //make an async call to api to create a question
    } catch (error) {
        
    }finally{
        setSubmitting(false);
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300  light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Ask any question you want to share with the community.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detail explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce yhe problem in detail and provide as much information
                as possible.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    placeholder="add tags"
                    onKeyDown={(e) => handleKey(e, field)}
                    className="no-focus paragraph-regular background-light900_dark300  light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subyle-medium text-light400_light500 flex background-light800_dark300 items-center justify-center gap-2 border-none px-4 py-2 capitalize  "
                          onClick={() => handletagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src="assets/icons/close.svg"
                            alt="close"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert size-[12px]"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 5 tags to describe your question.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Updating..." : "Posting..."}</>
          ) : (
            <> {type === "create" ? "Ask Question" : "Edit Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
