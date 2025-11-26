import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup/')({
    component: SignUp,
})

function SignUp() {
    return <div>Hello "/auth/sighup/"!</div>
}
