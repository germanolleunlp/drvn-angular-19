import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, defer, finalize, Observable, of } from 'rxjs';
import { PaginatedProducts, Product } from '@/app/core/models/product.model';
import { QueryParams } from '@/app/core/models/query-params.model';
import { ALL_CATEGORY, DEFAULT_LIMIT } from '@/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  empty() {
    return { products: [], total: 0, skip: 0, limit: 0 };
  }

  private searchUrl = (queryParams: QueryParams) => {
    const { q, category } = queryParams;
    if (category && category !== ALL_CATEGORY) return `/category/${category}`;
    if (q) return '/search';
    return '';
  };

  getProducts(queryParams: QueryParams = {}): Observable<PaginatedProducts> {
    return defer(() => {
      const { q = '', limit = DEFAULT_LIMIT, page = 1 } = queryParams;
      this._loading.set(true);

      return this.http
        .get<PaginatedProducts>(`${this.baseUrl}${this.searchUrl(queryParams)}`, {
          params: {
            q,
            limit,
            skip: page > 1 ? (page - 1) * limit : 0,
          },
        })
        .pipe(
          catchError((error) => {
            console.error('Error fetching products:', error);
            return of(this.empty());
          }),
          finalize(() => {
            this._loading.set(false);
          })
        );
    });
  }

  getProduct(id: Product['id']): Observable<Product | null> {
    return defer(() => {
      this._loading.set(true);

      return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
        catchError((error) => {
          console.error('Error fetching product:', error);
          return of(null);
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
    });
  }
}
