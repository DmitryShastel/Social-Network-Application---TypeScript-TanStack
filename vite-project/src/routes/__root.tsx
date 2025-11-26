import {createRootRoute, Link, Outlet} from '@tanstack/react-router'


export const Route = createRootRoute({
    component: () => (
        <>
            <div>
                <Link to='/'>Home Page</Link>
            </div>
            <Outlet/>
        </>
    ),
    notFoundComponent: () => <p>This page page doesn't exist!</p>,
})




