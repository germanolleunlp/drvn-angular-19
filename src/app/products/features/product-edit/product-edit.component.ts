import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@/app/core/services/product.service';
import { QueryParamsService } from '@/app/core/services/query-params.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductFormComponent } from '@/app/products/ui/product-form/product-form.component';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule, ProductFormComponent],
  templateUrl: './product-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductEditComponent {
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
