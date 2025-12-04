import {createFileRoute} from '@tanstack/react-router'
import {User} from "../../../modules/users/components/User";


export const Route = createFileRoute('/users/$userId/')({
    component: UserId,
})

function UserId() {
    return <div><User/></div>
}
