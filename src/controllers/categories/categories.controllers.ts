import { Request, Response } from "express";
import { categoriesService } from "../../services";
import { TCreateCategory, TListCategoriesResult } from "../../interfaces";


const post = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCreateCategory = req.body

  const newCategory = await categoriesService.create(payload)

  return res.status(201).json(newCategory);
};

const get = async (req: Request, res: Response): Promise<Response> => {
  const categories: TListCategoriesResult = await categoriesService.read()

  return res.status(200).json(categories);
};

const getRealEstates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export default {
  post,
  get,
  getRealEstates,
};
