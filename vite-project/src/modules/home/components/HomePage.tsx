import {useInfinitePosts} from "../hooks/useInfinitePosts";
import {useInfiniteScroll} from "../hooks/useInfiniteScroll";
import {Header} from "./Header";
import styled from "@emotion/styled";
import {useState} from "react";
import {Post} from "../../posts/types/post";
import {PostModal} from "../../posts/components/postModal";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PostCard = styled.article`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  min-height: 200px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const PostContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBody = styled.p`
  color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-top: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: white;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
`;

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
        <PageContainer>
            <Header/>

            <Main>
                <Title>Latest Posts</Title>

                <PostsGrid>
                    {allPosts.map((post) => (
                        <PostCard
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
                            <PostContent>
                                <PostTitle>{post.title}</PostTitle>
                                <PostBody>
                                    {post.body.length > 100
                                        ? `${post.body.substring(0, 100)}...`
                                        : post.body
                                    }
                                </PostBody>
                                <PostMeta>
                                    <span>Post #{post.id}</span>
                                    <span>User {post.userId}</span>
                                </PostMeta>
                            </PostContent>
                        </PostCard>
                    ))}
                </PostsGrid>

                {isLoading && (
                    <LoadingContainer>
                        <Spinner/>
                        <p>Loading posts...</p>
                    </LoadingContainer>
                )}

                <PostModal
                    post={selectedPost}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />

                {isFetchingNextPage && (
                    <LoadingContainer>
                        <Spinner/>
                        <p>Loading more posts...</p>
                    </LoadingContainer>
                )}

                {!hasNextPage && allPosts.length > 0 && (
                    <EndMessage>
                        <p>No more posts to load</p>
                    </EndMessage>
                )}

                {!isLoading && allPosts.length === 0 && (
                    <EndMessage>
                        <p>No posts found</p>
                    </EndMessage>
                )}
            </Main>
        </PageContainer>
    );
}