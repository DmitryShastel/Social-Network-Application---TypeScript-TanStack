import {createFileRoute} from "@tanstack/react-router";
import {HomePage} from "../modules/home/components/HomePage";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <>
            <HomePage/>
        </>
    );
}
