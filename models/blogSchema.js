import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    blog: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogModel);
