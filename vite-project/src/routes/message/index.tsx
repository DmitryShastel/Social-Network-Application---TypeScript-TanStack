import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/message/')({
    component: MessagePage,
})

function MessagePage() {
    return <div></div>
}
