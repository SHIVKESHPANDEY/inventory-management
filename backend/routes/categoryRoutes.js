import express from "express";
import {
  addDummyCategories,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

// router.get("/add-dummy-categories", addDummyCategories);n

router.get("/", getAllCategories);

export default router;
