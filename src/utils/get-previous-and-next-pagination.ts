interface getPreviousAndNextPaginationParams {
  currentPage: number;
  totalPages: number;
}

export function getPreviousAndNextPagination({
  currentPage,
  totalPages,
}: getPreviousAndNextPaginationParams) {
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return { previousPage, nextPage };
}
