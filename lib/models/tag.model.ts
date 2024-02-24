import { Schema, model, models, Document } from "mongoose";

interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  Users: Schema.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  Users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ],
});

export default models.Tag || model("Tag", tagSchema);