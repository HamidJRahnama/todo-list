import { Router } from "express";

import validationMiddleware from "../../middlewares/validateMiddleware.ts";
import authMiddleware from "../../middlewares/authMiddleware.ts";
import { CreateCategoryDto } from "./dto/create-category.dto.ts";
import { UpdateCategoryDto } from "./dto/update-category.dto.ts";
import { createCategoryController, deleteCategoryController, getCategoriesController, updateCategoryController } from "./category.controller.ts";

const router = Router();

router.use(authMiddleware);


router.get("/", getCategoriesController);
router.post("/", validationMiddleware(CreateCategoryDto), createCategoryController);
router.put("/:id", validationMiddleware(UpdateCategoryDto), updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;
