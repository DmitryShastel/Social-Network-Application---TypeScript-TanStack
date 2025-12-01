import {createFileRoute} from '@tanstack/react-router'
import {EditUser} from "../../../modules/users/components/EditUser";

export const Route = createFileRoute('/users/$userId/edit')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div><EditUser/></div>
}
