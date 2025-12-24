import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPost } from "@/apis/board";
import { boardKeys } from "@/apis/utils/queryKeys";
import { PostDetailContainer } from "@/components/board/PostDetailContainer";

interface PageProps {
    params: Promise<{
        boardId: string;
    }>;
}

export default async function BoardDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const boardId = parseInt(resolvedParams.boardId);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: boardKeys.detail(boardId),
        queryFn: () => getPost(boardId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen bg-white">
                <PostDetailContainer boardId={boardId} />
            </div>
        </HydrationBoundary>
    );
}
