"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByCategory } from "@/apis/board";
import { PostCard } from "@/components/board/PostCard";
import { CategoryFilter } from "@/components/board/CategoryFilter";
import { Pagination } from "@/components/board/Pagination";
import { Post } from "@/types/board";
import { boardKeys } from "@/apis/utils/queryKeys";
import { queryOptions } from "@/apis/utils/queryOptions";

interface BoardContainerProps {
    initialPage: number;
    initialSize: number;
    initialCategoryIds: string[];
}

export function BoardContainer({ initialPage, initialSize, initialCategoryIds }: BoardContainerProps) {
    const { data } = useQuery({
        queryKey: boardKeys.posts(initialPage, initialSize, initialCategoryIds),
        queryFn: () => {
            if (initialCategoryIds.length > 0) {
                return getPostsByCategory(initialCategoryIds, initialPage, initialSize);
            }
            return getPosts(initialPage, initialSize);
        },
        staleTime: queryOptions.board.staleTime,
    });

    if (!data) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">여행 커뮤니티</h1>
                <Link href="/board/write">
                    <Button>글쓰기</Button>
                </Link>
            </div>

            <CategoryFilter />

            <div className="min-h-[400px]">
                {data.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.items.map((post: Post) => (
                            <PostCard key={post.boardId} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                        <p className="text-xl font-medium mb-2">게시글이 없습니다.</p>
                        <p className="text-sm">첫 번째 여행기를 작성해보세요!</p>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={data.page.page}
                hasNext={data.page.hasNext}
            />
        </div>
    );
}
