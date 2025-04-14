import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/ui/layout/layout.component'),
    children: [
      {
        path: 'products',
        loadChildren: () => import('./products/features/product.routes'),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
