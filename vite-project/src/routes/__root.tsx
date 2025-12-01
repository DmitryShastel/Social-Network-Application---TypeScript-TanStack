import {createRootRoute, Outlet} from '@tanstack/react-router'
import {GlobalStyles} from "../modules/GlobalStyles";
import {NotFoundPage} from "../modules/notFoundPage/NotFoundPage";

export const Route = createRootRoute({
    component: () => (
        <>
            {/*<div>*/}
            {/*    <Link to='/'>Home Page</Link>*/}
            {/*</div>*/}
            <GlobalStyles/>
            <Outlet/>
        </>
    ),
    notFoundComponent: () => <><NotFoundPage/></>,
})
