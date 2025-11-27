import {createFileRoute} from "@tanstack/react-router";
import {HomePage} from "../modules/home/components/HomePage";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
            <HomePage/>
            {/*Index :*/}
            {/*<Link to="/auth/login"> sigIn </Link>*/}
            {/*<Link to="/auth/register">signUp </Link>*/}
            {/*<Link to="/messages">messages </Link>*/}
            {/*<Link to="/profile/$userId" params={{userId: '1'}}>profile </Link>*/}
            {/*<Link to="/posts">posts </Link>*/}
            {/*<Link to="/profile/edit"> profile-edit</Link>*/}
        </>
    );
}
