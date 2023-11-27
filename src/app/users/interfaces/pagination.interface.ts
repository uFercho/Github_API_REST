import { PageEvent } from '@angular/material/paginator';

export interface Pagination {
  prev: PaginationData;
  next: PaginationData;
  last: PaginationData;
  first: PaginationData;
}

export interface PaginationData {
  page?: number;
}

export interface PaginationConfig {
  length?:              number;
  pageSize:             number;
  pageIndex:            number;
  pageSizeOptions?:     number[];
  hidePageSize?:        boolean;
  showPageSizeOptions?: boolean;
  showFirstLastButtons: boolean;
  disabled?:            boolean;
}
