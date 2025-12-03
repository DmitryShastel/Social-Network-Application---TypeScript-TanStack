import {createFileRoute} from '@tanstack/react-router'
import {Message} from "../../../modules/messages/components/Message";

export const Route = createFileRoute('/message/$userId/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div><Message/></div>
}
