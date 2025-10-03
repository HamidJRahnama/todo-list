import Categorys from "./category.model.ts";
import { Types } from "mongoose";

export const createCategory = async (name: string, userId: string) => {
    const category = new Categorys({ name, userId: new Types.ObjectId(userId) });
    return category.save();
};

export const updateCategory = async (id: string, name: string, userId: string) => {
    const category = await Categorys.findOneAndUpdate(
        { _id: id, userId },
        { name },
        { new: true }
    );
    if (!category) throw new Error("Category not found or unauthorized");
    return category;
};

export const deleteCategory = async (id: string, userId: string) => {
    const category = await Categorys.findOneAndDelete({ _id: id, userId });
    if (!category) throw new Error("Category not found or unauthorized");
    return category;
};

export const getCategories = async (userId: string) => {
    return Categorys.find({ userId });
};
