import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '@/app/core/services/product.service';
import { QueryParamsService } from '@/app/core/services/query-params.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductCardComponent } from '@/app/products/ui/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  imports: [ProductCardComponent],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent {
  private readonly productService = inject(ProductService);
  private readonly queryParamsService = inject(QueryParamsService);
  private readonly route = inject(ActivatedRoute);

  protected readonly productId = toSignal(this.route.params.pipe(map((params) => params['id'])));
  protected readonly data = toSignal(this.productService.getProduct(this.productId()));
  protected readonly loading = this.productService.loading;

  constructor() {
    this.queryParamsService.clean();
  }
}
