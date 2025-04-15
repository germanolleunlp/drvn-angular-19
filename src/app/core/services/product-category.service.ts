import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@/environments/environment';
import { catchError, defer, finalize, map, Observable, of } from 'rxjs';
import { ProductCategory } from '@/app/core/models/product-category.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { categoryListAdapter } from '@/app/core/adapters/category-list-adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private readonly baseUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  private readonly _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  private getCategoryList(): Observable<ProductCategory['slug'][]> {
    return defer(() => {
      this._loading.set(true);
      return this.http.get<ProductCategory['slug'][]>(`${this.baseUrl}/category-list`).pipe(
        catchError((error) => {
          console.error('Error fetching category list:', error);
          return of([]);
        }),
        finalize(() => {
          this._loading.set(false);
        })
      );
    }).pipe(map((slugs) => categoryListAdapter(slugs)));
  }

  readonly categoryList = toSignal(this.getCategoryList(), {
    initialValue: [],
  });
}
