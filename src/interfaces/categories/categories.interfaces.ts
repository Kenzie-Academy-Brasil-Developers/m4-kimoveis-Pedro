import { z } from "zod";
import {
  categoriesSchema,
  createCategoriesSchema,
  getCategoriesSchema,
} from "../../schemas";

type TCategory = z.infer<typeof categoriesSchema>;
type TCreateCategory = z.infer<typeof createCategoriesSchema>;
type TListCategoriesResult = z.infer<typeof getCategoriesSchema>;

export { TCategory, TCreateCategory, TListCategoriesResult };
