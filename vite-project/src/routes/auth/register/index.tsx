import {createFileRoute} from '@tanstack/react-router'
import {SignUp} from "../../../modules/auth/components/SignUp";

export const Route = createFileRoute('/auth/register/')({
    component: SignUpRouter,
})

function SignUpRouter() {
    return <div><SignUp/></div>
}
