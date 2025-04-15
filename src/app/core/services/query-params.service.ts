import { inject, Injectable, signal } from '@angular/core';
import { QueryParams } from '@/app/core/models/query-params.model';
import { DEFAULT_LIMIT } from '@/app/shared/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly router = inject(Router);
  readonly params = signal<QueryParams>({
    q: '',
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  updateQueryParams(queryParams: Partial<QueryParams>): void {
    const params = { ...this.params(), ...queryParams };
    this.params.set(params);

    const { category: _category, ...rest } = params;
    void this.router.navigate([], {
      queryParams: rest,
      queryParamsHandling: 'merge',
    });
  }
}
