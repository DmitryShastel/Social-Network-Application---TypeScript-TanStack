import {useCallback, useEffect} from "react";
import {FetchNextPageOptions} from "@tanstack/react-query";

interface UseInfiniteScrollProps {
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<unknown>;
    threshold?: number;
}

export function useInfiniteScroll({
                                      hasNextPage,
                                      isFetchingNextPage,
                                      fetchNextPage,
                                      threshold = 100
                                  }: UseInfiniteScrollProps) {

    const handleScroll = useCallback(() => {
        if (isFetchingNextPage || !hasNextPage) return;

        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - threshold) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage, threshold]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
}