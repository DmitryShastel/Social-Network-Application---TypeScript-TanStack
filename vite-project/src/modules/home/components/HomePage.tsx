import {useInfinitePosts} from "../hooks/useInfinitePosts";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll";
import {Header} from "./Header";
import {useState} from "react";
import {Post} from "../../posts/types/post";
import {PostModal} from "../../posts/components/PostModal";
import * as S from "../styles/homePage";

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

    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allPosts = data?.pages.flatMap(page => page.posts) || [];

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPost(null), 300);
    };

    return (
        <S.PageContainer>
            <Header/>

            <S.Main>
                <S.Title>Latest Posts</S.Title>

                <S.PostsGrid>
                    {allPosts.map((post) => (
                        <S.PostCard
                            key={post.id}
                            onClick={() => handlePostClick(post)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handlePostClick(post);
                                }
                            }}
                        >
                            <S.PostContent>
                                <S.PostTitle>{post.title}</S.PostTitle>
                                <S.PostBody>
                                    {post.body.length > 100
                                        ? `${post.body.substring(0, 100)}...`
                                        : post.body
                                    }
                                </S.PostBody>
                                <S.PostMeta>
                                    <span>Post #{post.id}</span>
                                    <span>User {post.userId}</span>
                                </S.PostMeta>
                            </S.PostContent>
                        </S.PostCard>
                    ))}
                </S.PostsGrid>

                {isLoading && (
                    <S.LoadingContainer>
                        <S.Spinner/>
                        <p>Loading posts...</p>
                    </S.LoadingContainer>
                )}

                <PostModal
                    post={selectedPost}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />

                {isFetchingNextPage && (
                    <S.LoadingContainer>
                        <S.Spinner/>
                        <p>Loading more posts...</p>
                    </S.LoadingContainer>
                )}

                {!hasNextPage && allPosts.length > 0 && (
                    <S.EndMessage>
                        <p>No more posts to load</p>
                    </S.EndMessage>
                )}

                {!isLoading && allPosts.length === 0 && (
                    <S.EndMessage>
                        <p>No posts found</p>
                    </S.EndMessage>
                )}
            </S.Main>
        </S.PageContainer>
    );
}