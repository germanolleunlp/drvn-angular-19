import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, defer, finalize, Observable, of } from 'rxjs';
import { PaginatedProducts } from '@/app/core/models/product.model';
import { QueryParams } from '@/app/core/models/query-params.model';
import { DEFAULT_LIMIT } from '@/app/core/adapters/query.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();
  readonly empty: PaginatedProducts = { products: [], total: 0, skip: 0, limit: 0 };

  getProducts(queryParams: QueryParams = {}, searchUrl: string = ''): Observable<PaginatedProducts> {
    return defer(() => {
      const { q = '', limit = DEFAULT_LIMIT, page = 1 } = queryParams;
      this._loading.set(true);
      return this.http
        .get<PaginatedProducts>(`${this.baseUrl}${searchUrl}`, {
          params: {
            q,
            limit,
            skip: page > 1 ? page * limit : 0,
          },
        })
        .pipe(
          catchError((error) => {
            console.error('Error fetching products:', error);
            return of(this.empty);
          }),
          finalize(() => {
            this._loading.set(false);
          })
        );
    });
  }
}
