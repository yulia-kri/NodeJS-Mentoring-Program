export const addPagination = (items: any[], startFrom?: string, limit?: string) => {
    const skip = startFrom ? Number(startFrom) : 0;
    const perPage = limit ? Number(limit) : items.length;

    return {
        data: items.slice(skip, perPage),
        pagination: {
            total: items.length,
            skip,
            perPage,
        },
    };
};
