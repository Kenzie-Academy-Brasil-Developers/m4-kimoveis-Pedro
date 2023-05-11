import { Request, Response } from "express";
import { categoriesService } from "../../services";
import { TCreateCategory, TListCategoriesResult } from "../../interfaces";


const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCreateCategory = req.body

  const newCategory = await categoriesService.create(payload)

  return res.status(201).json(newCategory);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const categories: TListCategoriesResult = await categoriesService.read()

  return res.status(200).json(categories);
};



const readRealEstatesCategory = async (req: Request, res: Response): Promise<Response> => {

  const categoryId = Number(req.params.id)

  const realEstatesCategory = await categoriesService.readRealEstatesCategory(categoryId)

  return res.status(200).json(realEstatesCategory);
};

export default {
  create,
  read,
  readRealEstatesCategory,
};
