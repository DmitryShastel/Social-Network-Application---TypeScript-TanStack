import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/messages/')({
    component: Messages,
})

function Messages() {
    return <div>Hello "/messages/"!</div>
}
