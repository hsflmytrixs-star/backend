import { Course } from "../models/courseSchema.js";

export const addCourse = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      overview,
      sample_itinerary,
      packing_list,
      faq,
      course_details,
      image,
      video,
    } = req.body;

    await Course.create({
      title,
      subtitle,
      overview,
      sample_itinerary,
      packing_list,
      faq,
      course_details,
      image,
      video,
    });

    return res.status(200).json({
      message: "Course Added Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const {
      id,
      title,
      subtitle,
      overview,
      sample_itinerary,
      packing_list,
      faq,
      course_details,
      image,
      video,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Id required",
        success: false,
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(400).json({
        message: "Invalid course ID",
        success: false,
      });
    }

    course.title = title || course.title;
    course.subtitle = subtitle || course.subtitle;
    course.overview = overview || course.overview;
    course.sample_itinerary = sample_itinerary || course.sample_itinerary;
    course.packing_list = packing_list || course.packing_list;
    course.faq = faq || course.faq;
    course.course_details = course_details || course.course_details;
    course.image = image || course.image;
    course.video = video || course.video;

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while updating the course",
      success: false,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Id required",
        success: false,
      });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(400).json({
        message: "Course does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Id required",
        success: false,
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(400).json({
        message: "Invalid ID",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);
  }
};
