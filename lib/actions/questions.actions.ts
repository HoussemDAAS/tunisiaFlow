"use server";


import { connectToDB } from "../mongoose";

export async function createQuestion(question: Iquestion) {
  try {
    connectToDB();
    const newQuestion = new Questions(question);
    await newQuestion.save();
    console.log("question saved successfully");


  } catch (error) {
    console.log(error);
  }
}
