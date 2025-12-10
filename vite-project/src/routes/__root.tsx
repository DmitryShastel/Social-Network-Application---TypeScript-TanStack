import {createRootRoute, Outlet} from '@tanstack/react-router'
import {GlobalStyles} from "../modules/GlobalStyles";
import {NotFoundPage} from "../modules/notFoundPage/NotFoundPage";

export const Route = createRootRoute({
    component: () => (
        <>
            <GlobalStyles/>
            <Outlet/>
        </>
    ),
    notFoundComponent: () => <><NotFoundPage/></>,
})
