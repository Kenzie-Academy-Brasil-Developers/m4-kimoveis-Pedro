import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { categoriesSchema, createCategoriesSchema, getCategoriesSchema } from "../../schemas";
import { TCategory, TCreateCategory, TListCategoriesResult } from "../../interfaces/categories/categories.interfaces";

const create = async (payload: TCreateCategory): Promise<TCategory> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoriesRepository.findOneBy({
    name: payload.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category: TCategory = categoriesRepository.create(payload);

  await categoriesRepository.save(category);

  const newCategory = categoriesSchema.parse(category);

  return newCategory;
};

const read = async (): Promise<TListCategoriesResult> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategories: Array<Category> = await categoriesRepository.find();

  const categories = getCategoriesSchema.parse(findCategories);

  return categories;
};

export default { create, read };
