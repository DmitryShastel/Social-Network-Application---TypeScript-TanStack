import {createFileRoute} from '@tanstack/react-router'
import {App} from "../../../App";

export const Route = createFileRoute('/auth/signin/')({
    component: SignIn,
})

function SignIn() {
    return <div><App/></div>
}
