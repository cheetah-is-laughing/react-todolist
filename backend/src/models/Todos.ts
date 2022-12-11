import mongoose, { Document, Schema } from "mongoose";

export interface ITodos extends Document {}

const TodosSchema: Schema = new Schema(
  {
    author: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    isDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITodos>("Todos", TodosSchema);
