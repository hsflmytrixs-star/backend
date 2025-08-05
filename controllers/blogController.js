import { Blog } from "../models/blogSchema.js";

export const addBlog = async (req, res) => {
  try {
    const { title, blog, image } = req.body;

    await Blog.create({
      title,
      blog,
      image,
    });

    return res.status(200).json({
      message: "Blog Added Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id, title, blog, image } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id Required",
      });
    }

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
    }

    existingBlog.title = title || existingBlog.title;
    existingBlog.blog = blog || existingBlog.blog;
    existingBlog.image = image || existingBlog.image;

    const updatedBlog = await existingBlog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Id required",
        success: false,
      });
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(400).json({
        message: "Blog does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Id required",
        success: false,
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};
