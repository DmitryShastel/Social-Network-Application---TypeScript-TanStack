import {createHashHistory, createRouter} from "@tanstack/react-router";
import {routeTree} from "../routeTree.gen";
import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const router = createRouter({
    routeTree,
    history: createHashHistory(),
    context: {
        queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}