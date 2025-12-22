export const queryOptions = {
    board: {
        staleTime: 60 * 1000, // 1 minute
    },
    popular: {
        staleTime: 5 * 60 * 1000, // 5 minutes
    },
} as const;
