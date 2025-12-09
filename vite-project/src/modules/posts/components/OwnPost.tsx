import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Post} from "../types";
import {PostModal} from "./PostModal";
import UserStore from "../../../stores/user.store";
import * as S from "../styles/ownPost";

interface OwnPostsProps {
    userId: number;
    isOwnProfile: boolean;
}

export const OwnPosts = observer(({userId, isOwnProfile}: OwnPostsProps) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {isLoading} = UserStore;

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

    const handleKeyDown = (e: React.KeyboardEvent, post: Post) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePostClick(post);
        }
    };

    if (!isOwnProfile) {
        return null;
    }

    const posts = UserStore.getPostByUserId(userId);

    return (
        <S.PostsSection>
            <S.SectionTitle>My Posts ({posts.length})</S.SectionTitle>

            {isLoading ? (
                <S.LoadingContainer>
                    <S.Spinner/>
                    <p>Loading posts...</p>
                </S.LoadingContainer>
            ) : error ? (
                <S.NoPostsMessage>
                    <p>Error loading posts: {error}</p>
                </S.NoPostsMessage>
            ) : posts.length === 0 ? (
                <S.NoPostsMessage>
                    <p>You haven't created any posts yet.</p>
                    <p>Start sharing your thoughts!</p>
                </S.NoPostsMessage>
            ) : (
                <S.PostsContainer>
                    {posts.map((post) => (
                        <S.PostCard
                            key={post.id}
                            onClick={() => handlePostClick(post)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => handleKeyDown(e, post)}
                        >
                            <S.PostTitle>{post.title}</S.PostTitle>
                            <S.PostBody>
                                {post.body.length > 150
                                    ? `${post.body.substring(0, 150)}...`
                                    : post.body
                                }
                            </S.PostBody>

                            {post.tags && post.tags.length > 0 && (
                                <S.TagsContainer>
                                    {post.tags.slice(0, 3).map((tag, index) => (
                                        <S.Tag key={index}>{tag}</S.Tag>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <S.Tag>+{post.tags.length - 3}</S.Tag>
                                    )}
                                </S.TagsContainer>
                            )}

                            <S.PostMeta>
                                <div>
                                    <span>#{post.id}</span>
                                </div>
                                <div>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                            </S.PostMeta>

                            <S.StatsRow>
                                <S.Stat>
                                    <span>👍</span>
                                    <span>{post.reactions.likes}</span>
                                </S.Stat>
                                <S.Stat>
                                    <span>👎</span>
                                    <span>{post.reactions.dislikes}</span>
                                </S.Stat>
                                <S.Stat>
                                    <span>👁️</span>
                                    <span>{post.views}</span>
                                </S.Stat>
                            </S.StatsRow>
                        </S.PostCard>
                    ))}
                </S.PostsContainer>
            )}

            <PostModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </S.PostsSection>
    );
});