import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/edit/"!</div>
}
