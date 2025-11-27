import {useQuery} from "@tanstack/react-query";

type Post = {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

type Reactions = {
    likes: number
    dislikes: number
}

type PostsResponse = {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export function App() {

    const {data, isLoading, error} = useQuery<PostsResponse>({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://dummyjson.com/posts')
            if (!res.ok) throw new Error('Some error is occurred')
            return res.json()
        },
        staleTime: 1000 * 60 * 5
    })

    if (isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <p>Error: {error.message}</p>

    console.log(data)

    return (
        <>
            <h1>Posts</h1>
            <ul>
                {data?.posts?.map((post: Post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <button onClick={() => {
                        }}>Add new post
                        </button>
                        <button onClick={() => {
                        }}>Delete post
                        </button>
                        <button onClick={() => {
                        }}>Update post
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
