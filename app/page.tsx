

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { ServiceHero } from "@/components/main/ServiceHero";
import { PopularPosts } from "@/components/main/PopularPosts";
import { getPopularPosts } from "@/apis/board";
import { boardKeys } from "@/apis/utils/queryKeys";
import { queryOptions } from "@/apis/utils/queryOptions";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: boardKeys.popular(),
    queryFn: getPopularPosts,
    ...queryOptions.popular,
  });

  return (
    <div className="flex flex-col">
      <ServiceHero />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PopularPosts />
      </HydrationBoundary>
    </div>
  );
}
