export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export const getPaginationParams = (req: Request): PaginationParams => {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const paginationResponse = (data: any[], total: number, { page, limit }: PaginationParams) => ({
  data,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
  },
});