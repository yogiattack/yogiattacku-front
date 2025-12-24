export const boardKeys = {
    all: ['board'] as const,
    posts: (page: number, size: number, categories: string[]) =>
        [...boardKeys.all, 'posts', { page, size, categories }] as const,
    detail: (boardId: number) => [...boardKeys.all, 'detail', boardId] as const,
    popular: () => [...boardKeys.all, 'popular'] as const,
};
