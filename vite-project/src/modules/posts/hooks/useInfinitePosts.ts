import {useInfiniteQuery} from "@tanstack/react-query";
import {PostsResponse} from "../types/post";


export function useInfinitePosts(limit: number = 10) {
    return useInfiniteQuery({
        queryKey: ['posts', limit],
        queryFn: async ({pageParam = 0}) => {
            const skip = pageParam;
            const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
            if (!res.ok) throw new Error('Some error occurred');
            return res.json() as Promise<PostsResponse>;
        },
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },
        staleTime: 1000 * 60 * 5,
        initialPageParam: 0,
    });
}