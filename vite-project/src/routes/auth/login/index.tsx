import {createFileRoute} from '@tanstack/react-router'
import {SignIn} from "../../../modules/auth/components/SignIn";

export const Route = createFileRoute('/auth/login/')({
    component: SignInRoute,
})

function SignInRoute() {
    return <div><SignIn/></div>
}
