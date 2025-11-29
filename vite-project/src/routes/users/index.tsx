import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
    component: UserId,
})

function UserId() {
    return <div>All users</div>
}
