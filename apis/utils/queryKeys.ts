export const boardKeys = {
    all: ['board'] as const,
    posts: (page: number, size: number, categories: string[]) =>
        [...boardKeys.all, 'posts', { page, size, categories }] as const,
    detail: (boardId: number) => [...boardKeys.all, 'detail', boardId] as const,
    popular: () => [...boardKeys.all, 'popular'] as const,
    mypage: (page: number, size: number) => [...boardKeys.all, 'mypage', { page, size }] as const,
};

export const userKeys = {
    all: ['user'] as const,
    profile: () => [...userKeys.all, 'profile'] as const,
};
