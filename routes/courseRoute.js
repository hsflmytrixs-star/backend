import express from "express";
import { addCourse, deleteCourse, getAllCourse, getCourseById, updateCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/add").post(addCourse);

router.route("/edit").put(updateCourse);

router.route("/delete").delete(deleteCourse);

router.route("/get/all").get(getAllCourse);

router.route("/get/:id").get(getCourseById);

export default router;