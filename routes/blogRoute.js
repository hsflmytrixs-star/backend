import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

router.route("/add").post(addBlog);

router.route("/edit").put(updateBlog);

router.route("/delete").delete(deleteBlog);

router.route("/get/all").get(getAllBlogs);

router.route("/get/:id").get(getBlogById);

export default router;