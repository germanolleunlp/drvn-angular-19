import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { QueryParamsService } from '@/app/core/services/query-params.service';
import { PaginatedProducts } from '@/app/core/models/product.model';
import { LIMITS } from '@/app/shared/constants';
import { SearchInputComponent } from '@/app/shared/ui/search-input/search-input.component';

@Component({
  selector: 'app-products-table',
  imports: [SearchInputComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  private readonly queryParamsService = inject(QueryParamsService);
  protected readonly limits = LIMITS;
  protected params = this.queryParamsService.params();

  data = input.required<PaginatedProducts>();

  nextPage(): void {
    const { total, skip, limit } = this.data();
    const { page } = this.params;
    const next = skip + limit < total;
    if (!page || !next) return;

    this.queryParamsService.updateQueryParams({ page: page + 1 });
  }

  previousPage(): void {
    const { page } = this.params;
    if (!page || page <= 1) return;
    this.queryParamsService.updateQueryParams({ page: page - 1 });
  }

  onChangeLimit(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.queryParamsService.updateQueryParams({ limit: Number(select.value), page: 1 });
  }
}
