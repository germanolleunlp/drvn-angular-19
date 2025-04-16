import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ProductCategoryService } from '@/app/core/services/product-category.service';
import { Router } from '@angular/router';
import { ProductCategory } from '@/app/core/models/product-category.model';
import { QueryParamsService } from '@/app/core/services/query-params.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly queryParamsService = inject(QueryParamsService);
  private readonly productCategoryService = inject(ProductCategoryService);
  private readonly router = inject(Router);

  protected category = computed(() => this.queryParamsService.params().category);

  readonly data = this.productCategoryService.categoryList;
  readonly loading = this.productCategoryService.loading;

  navigate(category: ProductCategory['slug']): void {
    void this.router.navigate([`products/category/${category}`]);
  }
}
