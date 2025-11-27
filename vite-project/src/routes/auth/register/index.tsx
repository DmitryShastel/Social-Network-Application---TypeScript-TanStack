import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register/')({
    component: SignUpRouter,
})

function SignUpRouter() {
    return <div>SignUp</div>
}
