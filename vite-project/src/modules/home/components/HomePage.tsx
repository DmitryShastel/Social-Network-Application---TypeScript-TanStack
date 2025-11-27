import {homeStyles} from "../styles/homeStyles";
import {useInfinitePosts} from "../hooks/useInfinitePosts";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll";
import {Header} from "./Header";


export function HomePage() {

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinitePosts(10);

    useInfiniteScroll({
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        threshold: 100
    });

    console.log(data)

    const allPosts = data?.pages.flatMap(page => page.posts) || [];

    return (
        <div css={homeStyles.container}>

            <Header/>

            <main css={homeStyles.main}>
                <h2 css={homeStyles.title}>Latest Posts</h2>

                <div css={homeStyles.postsGrid}>
                    {allPosts.map((post) => (
                        <article key={post.id} css={homeStyles.postCard}>
                            <div css={homeStyles.postContent}>
                                <h3 css={homeStyles.postTitle}>{post.title}</h3>
                                <p css={homeStyles.postBody}>
                                    {post.body.length > 100
                                        ? `${post.body.substring(0, 100)}...`
                                        : post.body
                                    }
                                </p>
                                <div css={homeStyles.postMeta}>
                                    <span>Post #{post.id}</span>
                                    <span>User {post.userId}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {isLoading && (
                    <div css={homeStyles.loading}>
                        <div css={homeStyles.spinner}></div>
                        <p>Loading posts...</p>
                    </div>
                )}

                {isFetchingNextPage && (
                    <div css={homeStyles.loading}>
                        <div css={homeStyles.spinner}></div>
                        <p>Loading more posts...</p>
                    </div>
                )}

                {!hasNextPage && allPosts.length > 0 && (
                    <div css={homeStyles.endMessage}>
                        <p>No more posts to load</p>
                    </div>
                )}

                {!isLoading && allPosts.length === 0 && (
                    <div css={homeStyles.endMessage}>
                        <p>No posts found</p>
                    </div>
                )}
            </main>
        </div>
    );
}

