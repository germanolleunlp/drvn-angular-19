import { ProductCategoryService } from '@/app/core/services/product-category.service';
import { QueryParamsService } from '@/app/core/services/query-params.service';
import { Router } from '@angular/router';
import { render, RenderResult, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { SidebarComponent } from '@/app/shared/ui/sidebar/sidebar.component';

describe('SidebarComponent', () => {
  let queryParamsServiceMock: jest.Mocked<QueryParamsService>;
  let productCategoryServiceMock: jest.Mocked<ProductCategoryService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    queryParamsServiceMock = {
      params: jest.fn(),
    } as unknown as jest.Mocked<QueryParamsService>;

    productCategoryServiceMock = {
      categoryList: jest.fn(),
      loading: jest.fn(),
    } as unknown as jest.Mocked<ProductCategoryService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;
  });

  const setup: () => Promise<RenderResult<SidebarComponent>> = () => {
    return render(SidebarComponent, {
      providers: [
        { provide: QueryParamsService, useValue: queryParamsServiceMock },
        { provide: ProductCategoryService, useValue: productCategoryServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  };

  it('should show a loading spinner', async () => {
    productCategoryServiceMock.loading.mockReturnValueOnce(true);
    productCategoryServiceMock.categoryList.mockReturnValueOnce([]);
    queryParamsServiceMock.params.mockReturnValueOnce({ category: undefined });

    await setup();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render an empty list', async () => {
    productCategoryServiceMock.loading.mockReturnValueOnce(false);
    productCategoryServiceMock.categoryList.mockReturnValueOnce([]);
    queryParamsServiceMock.params.mockReturnValueOnce({ category: undefined });

    await setup();

    const categories = screen.queryAllByRole('listitem');
    expect(categories.length).toBe(0);
  });

  it('should list all the categories', async () => {
    productCategoryServiceMock.loading.mockReturnValueOnce(false);
    productCategoryServiceMock.categoryList.mockReturnValueOnce(['Electronics', 'Books']);
    queryParamsServiceMock.params.mockReturnValueOnce({ category: undefined });

    await setup();

    const categories = screen.getAllByRole('listitem');
    expect(categories.length).toBe(2);
  });

  it('should navigate to the selected category', async () => {
    const category = 'Electronics';
    productCategoryServiceMock.loading.mockReturnValueOnce(false);
    productCategoryServiceMock.categoryList.mockReturnValueOnce(['Electronics', 'Books']);
    queryParamsServiceMock.params.mockReturnValueOnce({ category });

    await setup();

    const [first] = screen.getAllByRole('listitem');
    expect(first.classList).toContain('active');
    await userEvent.click(first);
    expect(routerMock.navigate).toHaveBeenNthCalledWith(1, [`products/category/${category}`]);
  });
});
