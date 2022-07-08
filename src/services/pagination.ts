export const addPagination = (items: any[], skip?: number, perPage?: number) => {
    skip = skip ?? 0;
    perPage = perPage ?? items.length;

    return {
        data: items.slice(skip, perPage),
        pagination: {
            total: items.length,
            skip,
            perPage,
        },
    };
};
