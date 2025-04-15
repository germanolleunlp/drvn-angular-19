import { ProductCategory } from '@/app/core/models/product-category.model';
import { ALL_CATEGORY } from '@/app/shared/constants';

export const categoryListAdapter = (slugs: ProductCategory['slug'][]) => {
  return [ALL_CATEGORY, ...slugs];
};
