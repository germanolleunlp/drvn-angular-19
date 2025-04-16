import { inject, Injectable, signal } from '@angular/core';
import { QueryParams } from '@/app/core/models/query-params.model';
import { ALL_CATEGORY, DEFAULT_LIMIT } from '@/app/shared/constants';
import { Router } from '@angular/router';

const INITIAL_VALUE: QueryParams = {
  q: '',
  page: 1,
  limit: DEFAULT_LIMIT,
};

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly router = inject(Router);
  readonly params = signal<QueryParams>(INITIAL_VALUE);

  private get commands(): any[] {
    const { category, q } = this.params();
    if (category == ALL_CATEGORY) return [];
    if (q) return ['products'];
    return [];
  }

  clean(): void {
    this.params.set(INITIAL_VALUE);
  }

  updateQueryParams(queryParams: Partial<QueryParams>): void {
    const params = { ...this.params(), ...queryParams };
    this.params.set(params);

    const { category: _ignore, ...rest } = params;
    void this.router.navigate(this.commands, {
      queryParams: rest,
      queryParamsHandling: 'merge',
    });
  }
}
