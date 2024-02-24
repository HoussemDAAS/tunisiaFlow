"use server";

import Question, { Iquestion } from "../models/question.model";
import Tag from "../models/tag.model";
import { connectToDB } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    connectToDB();
    const { title, content, tags, author } = params;
    const question = await Question.create({ title, content, author });

    const tagDocuments = [];
    for (const tag of tags) {
      const tagExists = await Tag.findOneAndUpdate({
        name: { $regex: new RegExp("^" + tag + "$", "i") },
      },
      {$setOnInsert:{name:tag},$push:{questions:question._id}},
      {upsert: true, new: true}
      );
      tagDocuments.push(tagExists._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    });
    console.log("add succeffully");

  } catch (error) {
    console.log(error);
  }
}
