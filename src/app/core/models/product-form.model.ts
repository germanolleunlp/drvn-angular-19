import { FormControl } from '@angular/forms';
import { Product } from '@/app/core/models/product.model';

export interface ProductForm {
  title: FormControl<Product['title']>;
  price: FormControl<Product['price']>;
  stock: FormControl<Product['stock']>;
  description: FormControl<Product['description']>;
}
