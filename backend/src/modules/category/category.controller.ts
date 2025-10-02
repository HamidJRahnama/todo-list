import type { Request, Response } from "express";
import * as categoryService from "./category.service.ts";

export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const userId = req["userId"];

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const category = await categoryService.createCategory(name, userId);
        res.status(201).json(category);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const id = req.params.id;
        const userId = req["userId"];

        if (!id) return res.status(400).json({ message: "Category ID is required" });
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const category = await categoryService.updateCategory(id, name, userId);
        res.json(category);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req["userId"];

        if (!id) return res.status(400).json({ message: "Category ID is required" });
        if (!userId) return res.status(401).json({ message: "Unauthorized" });


        await categoryService.deleteCategory(id, userId);
        res.json({ message: "Category deleted" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getCategoriesController = async (req: Request, res: Response) => {
    
    try {
        const userId = req["userId"];
    
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const categories = await categoryService.getCategories(userId);
        res.json(categories);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
