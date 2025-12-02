import styled from "@emotion/styled";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Post} from "../types";
import {PostModal} from "./PostModal";
import UserStore from "../../../stores/user.store";

const PostsSection = styled.section`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "📝";
    font-size: 1.5rem;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.article`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBody = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const NoPostsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
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

interface OwnPostsProps {
    userId: number;
    isOwnProfile: boolean;
}

export const OwnPosts = observer(({userId, isOwnProfile}: OwnPostsProps) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {isLoading} = UserStore

    useEffect(() => {
        if (isOwnProfile && userId) {
            loadUserPosts();
        }
    }, [userId, isOwnProfile]);

    const loadUserPosts = async () => {
        try {
            await UserStore.getUsersPosts(userId);
        } catch (error) {
            console.error("Error loading posts:", error);
        }
    };

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPost(null), 300);
    };

    const handleLikeClick = () => {
    };

    if (!isOwnProfile) {
        return null;
    }

    const posts = UserStore.getPostByUserId(userId);

    return (
        <PostsSection>
            <SectionTitle>My Posts ({posts.length})</SectionTitle>

            {isLoading ? (
                <LoadingContainer>
                    <Spinner/>
                    <p>Loading posts...</p>
                </LoadingContainer>
            ) : error ? (
                <NoPostsMessage>
                    <p>Error loading posts: {error}</p>
                </NoPostsMessage>
            ) : posts.length === 0 ? (
                <NoPostsMessage>
                    <p>You haven't created any posts yet.</p>
                    <p>Start sharing your thoughts!</p>
                </NoPostsMessage>
            ) : (
                <PostsContainer>
                    {posts.map((post) => (
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
                            <PostTitle>{post.title}</PostTitle>
                            <PostBody>
                                {post.body.length > 150
                                    ? `${post.body.substring(0, 150)}...`
                                    : post.body
                                }
                            </PostBody>

                            {post.tags && post.tags.length > 0 && (
                                <TagsContainer>
                                    {post.tags.slice(0, 3).map((tag, index) => (
                                        <Tag key={index}>{tag}</Tag>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <Tag>+{post.tags.length - 3}</Tag>
                                    )}
                                </TagsContainer>
                            )}

                            <PostMeta>
                                <div>
                                    <span>#{post.id}</span>
                                </div>
                                <div>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </PostMeta>

                            <StatsRow>
                                <Stat>
                                    <span>👍</span>
                                    <span>{post.reactions.likes}</span>
                                </Stat>
                                <Stat>
                                    <span>👎</span>
                                    <span>{post.reactions.dislikes}</span>
                                </Stat>
                                <Stat>
                                    <span>👁️</span>
                                    <span>{post.views}</span>
                                </Stat>
                            </StatsRow>
                        </PostCard>
                    ))}
                </PostsContainer>
            )}

            <PostModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onLikeClick={handleLikeClick}
            />
        </PostsSection>
    );
});