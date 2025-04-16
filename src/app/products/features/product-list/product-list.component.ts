import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '@/app/core/services/product.service';
import { SidebarComponent } from '@/app/shared/ui/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '@/app/core/models/query-params.model';
import { queryParamsAdapter } from '@/app/core/adapters/query-params.adapter';
import { QueryParamsService } from '@/app/core/services/query-params.service';
import { PaginatedProducts } from '@/app/core/models/product.model';
import { combineLatestWith, map } from 'rxjs';
import { ProductsTableComponent } from '@/app/products/ui/products-table/products-table.component';

@Component({
  selector: 'app-product-list',
  imports: [SidebarComponent, ProductsTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly queryParamsService = inject(QueryParamsService);
  private readonly route = inject(ActivatedRoute);

  readonly loading = this.productService.loading;
  readonly products = signal<PaginatedProducts>(this.productService.empty());

  constructor() {
    effect(() => {
      this.productService.getProducts(this.queryParamsService.params()).subscribe((products) => {
        this.products.set(products);
      });
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        combineLatestWith(this.route.queryParams),
        map(([params, queryParams]) => queryParamsAdapter({ ...params, ...queryParams }))
      )
      .subscribe((queryParams: QueryParams) => this.queryParamsService.updateQueryParams(queryParams));
  }
}
