import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId')({
    component: UserId,
})

function UserId() {
    return <div>Hello "/profile/"!</div>
}
