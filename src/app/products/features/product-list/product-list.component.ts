import { Component, computed, inject } from '@angular/core';
import { ProductService } from '@/app/core/services/product.service';
import { SidebarComponent } from '@/app/shared/ui/sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { QueryParams } from '@/app/core/models/query-params.model';
import { DEFAULT_LIMIT, limitAdapter, pageAdapter, queryAdapter } from '@/app/core/adapters/query.adapter';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export default class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly page = toSignal(this.route.queryParams.pipe(map((params: QueryParams) => pageAdapter(params))), {
    initialValue: 1,
  });

  readonly limit = toSignal(this.route.queryParams.pipe(map((params: QueryParams) => limitAdapter(params))), {
    initialValue: DEFAULT_LIMIT,
  });

  readonly query = toSignal(this.route.queryParams.pipe(map((params: QueryParams) => queryAdapter(params))), {
    initialValue: '',
  });

  private readonly category = toSignal(this.route.params.pipe(map((params) => params['slug'])));

  readonly queryParams = computed(() => {
    const params: QueryParams = {};
    if (this.query()) params['q'] = this.query();
    if (this.page()) params['page'] = this.page();
    if (this.limit()) params['limit'] = this.limit();
    return params;
  });

  readonly searchUrl = computed(() => {
    if (this.query()) return '/search';
    if (this.category()) return `/category/${this.category()}`;
    return '';
  });

  readonly loading = this.productService.loading;
  readonly products = toSignal(this.productService.getProducts(this.queryParams(), this.searchUrl()), {
    initialValue: this.productService.empty,
  });

  private updateQueryParams(params: Partial<QueryParams>): void {
    const { queryParams } = this.route.snapshot;
    void this.router.navigate([], {
      queryParams: { ...queryParams, ...params },
      queryParamsHandling: 'merge',
    });
  }

  nextPage(): void {
    this.updateQueryParams({ page: this.page() + 1 });
  }

  previousPage(): void {
    const current = this.page();
    if (current <= 1) return;
    this.updateQueryParams({ page: current - 1 });
  }

  changeLimit(limit: QueryParams['limit']): void {
    this.updateQueryParams({ limit });
  }
}
