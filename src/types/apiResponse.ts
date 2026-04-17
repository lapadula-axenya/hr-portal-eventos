export type GetAllBaseParams = {
  page?: number;
  limit?: number;
  select?: string;
  sortBy?: string;
};

export type GetAllParamsDefault<GetAllParams> = GetAllParams & GetAllBaseParams;

export type ApiResponseMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type ApiResponse<EntityData> = {
  data: EntityData[];
  meta: ApiResponseMeta;
};

export type Identifiable<T> = T & { id: string };
