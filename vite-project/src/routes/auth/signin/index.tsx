import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signin/')({
    component: SignIn,
})

function SignIn() {
    return <div>Hello "/auth/signing/"!</div>
}
