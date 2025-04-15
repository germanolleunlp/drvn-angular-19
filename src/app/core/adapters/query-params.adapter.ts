import { QueryParams } from '@/app/core/models/query-params.model';
import { Params } from '@angular/router';
import { DEFAULT_LIMIT } from '@/app/shared/constants';

export const queryParamsAdapter = (params: Params): Partial<QueryParams> => {
  const { page = 1, limit = DEFAULT_LIMIT, q, slug: category } = params;
  return {
    page: Number(page),
    limit: Number(limit),
    q,
    category,
  };
};
