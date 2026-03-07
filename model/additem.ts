import mongoose, { Schema, models } from "mongoose";

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    price:{type: String, required:true},
    category:{type: String, required:true},
    description:{type: String, required:true},

  },
  { timestamps: true }
);

export const Additem = models.User || mongoose.model("Additem", itemSchema);
