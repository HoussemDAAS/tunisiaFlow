import { z } from "zod";

export const QuestionSchema = z.object({
    title: z.string().min(1).max(130),
    explanation: z.string().min(1).max(1000,"explanation is too long"),
    tags: z.array(z.string().min(1).max(15)).min(1).max(5),

  });
  export const AnswerSchema = z.object({
   answer :z.string().min(30)

  });