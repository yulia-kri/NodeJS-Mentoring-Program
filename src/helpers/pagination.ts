export const addPagination = (items: any[], startFrom?: string, limit?: string) => {
    const skip = Number(startFrom) ?? 0;
    const perPage = Number(limit) ?? items.length;

    return {
        data: items.slice(skip, perPage),
        pagination: {
            total: items.length,
            skip,
            perPage,
        },
    };
};
