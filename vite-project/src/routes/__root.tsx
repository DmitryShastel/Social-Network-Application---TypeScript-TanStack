import {createRootRoute, Outlet} from '@tanstack/react-router'
import {GlobalStyles} from "../modules/GlobalStyles";

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
    notFoundComponent: () => <p>This page doesn't exist!</p>,
})
