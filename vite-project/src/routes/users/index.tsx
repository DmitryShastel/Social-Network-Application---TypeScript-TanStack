import {createFileRoute} from '@tanstack/react-router'
import {ListOfUsers} from "../../modules/users/components/ListOfUsers";

export const Route = createFileRoute('/users/')({
    component: Users,
})

function Users() {
    return <div><ListOfUsers/></div>
}
