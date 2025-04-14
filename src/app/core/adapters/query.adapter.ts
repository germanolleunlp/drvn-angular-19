import { QueryParams } from '@/app/core/models/query-params.model';

export const LIMITS = [10, 25, 50, 100];
export const DEFAULT_LIMIT = LIMITS[0];

export const pageAdapter = (params: QueryParams): number => {
  if (!params.page) return 1;
  return Number(params.page);
};

export const limitAdapter = (params: QueryParams): number => {
  if (!params.limit) return DEFAULT_LIMIT;
  const n = Number(params.limit);
  return LIMITS.includes(n) ? n : DEFAULT_LIMIT;
};

export const queryAdapter = (params: QueryParams): string => {
  if (!params.q) return '';
  return params.q;
};
