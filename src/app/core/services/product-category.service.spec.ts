import { TestBed } from '@angular/core/testing';
import { ProductCategoryService } from './product-category.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '@/environments/environment';
import { ALL_CATEGORY } from '@/app/shared/constants';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting(), ProductCategoryService],
    });

    service = TestBed.inject(ProductCategoryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch product categories and add the all category', () => {
    const mockCategories = ['Electronics', 'Books'];

    expect(service.loading()).toBe(true);

    const req = httpTesting.expectOne(`${environment.apiUrl}/products/category-list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    expect(service.loading()).toBe(false);
    expect(service.categoryList()).toEqual([ALL_CATEGORY, ...mockCategories]);
  });
});
