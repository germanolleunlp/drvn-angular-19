import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list.component'),
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./product-list/product-list.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./product-detail/product-detail.component'),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./product-edit/product-edit.component'),
  },
] as Routes;
