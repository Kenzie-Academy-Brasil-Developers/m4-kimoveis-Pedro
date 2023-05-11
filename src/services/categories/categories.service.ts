import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { categoriesSchema, createCategoriesSchema, getCategoriesSchema } from "../../schemas";
import { TCreateCategory, TCategory, TListCategoriesResult } from "../../interfaces";

const create = async (payload: TCreateCategory): Promise<TCategory> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoriesRepository.findOneBy({
    name: payload.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoriesRepository.create(payload);

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

const readRealEstatesCategory = async (categoryId: number) => {
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

  const findCategory = await categoryRepository.findOneBy({
    id: categoryId
  })

  if (!findCategory) throw new AppError('Category not found', 404)

  const realEstatesCategory = await categoryRepository.findOne({
    where: {
      id: categoryId
    },
    relations: {
      realEstate: true
    }
  })

  return realEstatesCategory
}



export default { create, read, readRealEstatesCategory };
