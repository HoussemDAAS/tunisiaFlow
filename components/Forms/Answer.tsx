"use client";
import React, { use, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/Answer.action";
import { usePathname } from "next/navigation";
const Answer = ({mongoUserId,questionId}:{mongoUserId:string,questionId:string}) => {
    const pathname=usePathname();
  const { theme } = useTheme();
  const [isSubmitting, setSubmitting] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const handleCreateAnswer = async (values:z.infer<typeof AnswerSchema>) => {
    setSubmitting(true);
    try {
        await createAnswer({
            content:values.answer,
           author: JSON.parse(mongoUserId),
           question: JSON.parse(questionId),
           path:pathname

            
        });
        form.reset();
        if(editorRef.current){
            const editor =editorRef.current as any;
            editor.setContent(" ");
        }
        console.log("success");
    } catch (error) {
        console.log(error);
    }finally{
        setSubmitting(false);
    }
  };
  return (
    <div className="mt-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800 ">
          Write your answer here
        </h4>
        <Button className="btn light-border-2  gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none ">
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain mr-2"
            onClick={()=>{}}
          />
          Generate an Answer with AI
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
