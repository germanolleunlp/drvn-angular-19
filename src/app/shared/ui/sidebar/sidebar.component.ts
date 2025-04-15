import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductCategoryService } from '@/app/core/services/product-category.service';
import { Router } from '@angular/router';
import { ProductCategory } from '@/app/core/models/product-category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly productCategoryService = inject(ProductCategoryService);
  private readonly router = inject(Router);

  readonly data = this.productCategoryService.categoryList;
  readonly loading = this.productCategoryService.loading;

  navigate(category: ProductCategory['slug']): void {
    void this.router.navigate([`products/category/${category}`]);
  }
}
