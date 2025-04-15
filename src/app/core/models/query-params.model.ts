import { ProductCategory } from '@/app/core/models/product-category.model';

export interface QueryParams {
  page?: number;
  limit?: number;
  q?: string;
  category?: ProductCategory['slug'];
}
