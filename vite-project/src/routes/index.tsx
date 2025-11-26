import {createFileRoute, Link} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div>
            Index :
            <Link to="/auth/signin"> sigIn </Link>
            <Link to="/auth/signup">signUp </Link>
            <Link to="/messages">messages </Link>
            <Link to="/profile/$userId" params={{userId: '1'}}>profile </Link>
            <Link to="/posts">posts </Link>
            <Link to="/profile/edit"> profile-edit</Link>
        </div>
    );
}
