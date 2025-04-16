import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '@/app/core/services/product.service';
import { QueryParamsService } from '@/app/core/services/query-params.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly queryParamsService = inject(QueryParamsService);

  ngOnInit(): void {
    this.queryParamsService.clean();
  }
}
