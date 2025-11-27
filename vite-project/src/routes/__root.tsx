import {createRootRoute, Outlet} from '@tanstack/react-router'
import {GlobalStyles} from "../modules/GlobalStyles";
import {HomePage} from "../modules/home/components/HomePage";

export const Route = createRootRoute({
    component: () => (
        <>
            {/*<div>*/}
            {/*    <Link to='/'>Home Page</Link>*/}
            {/*</div>*/}
            <GlobalStyles/>
            <HomePage/>
            <Outlet/>
        </>
    ),
    notFoundComponent: () => <p>This page doesn't exist!</p>,
})
