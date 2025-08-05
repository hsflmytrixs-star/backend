import mongoose from "mongoose";

const courseModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    overview: {
      type: String,
    },
    sample_itinerary: {
      type: String,
    },
    packing_list: {
      type: String,
    },
    faq: {
      type: String,
    },
    course_details: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseModel);
