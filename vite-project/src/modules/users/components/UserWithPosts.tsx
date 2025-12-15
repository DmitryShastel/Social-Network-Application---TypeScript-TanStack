import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useRouter} from "@tanstack/react-router";
import {User} from "../types/user";
import {Button} from "../../../shared/ui/Button/Button";
import UserStore from "../../../stores/user.store";
import * as S from "../styles/UserWithPosts";
import {Post} from "../../posts/types/post";
import {PostModal} from "../../../shared/ui/PostModal/PostModal";

interface UserWithPostsProps {
    user: User;
    isLoading?: boolean;
    postsError?: null;
}

export const UserWithPosts = observer(({user, isLoading, postsError}: UserWithPostsProps) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const posts = UserStore.getPostByUserId(user.id);

    useEffect(() => {
        const loadPosts = async () => {
            if (posts.length > 0) {
                return;
            }
            try {
                await UserStore.getUsersPosts(user.id);
            } catch (error) {
                console.error('Error loading posts:', error);
            }
        };

        loadPosts();
    }, [user.id]);

    const handleUserAccount = () => {
        router.navigate({to: '/users/$userId', params: {userId: user.id}});
    };

    const handleUserMessage = () => {
        router.navigate({to: '/message/$userId/', params: {userId: user.id}});
    };

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPost(null), 300);
    };

    return (
        <>
        <S.UserCard>
            <S.UserHeader>
                <S.UserAvatar
                    src={user?.image || S.DEFAULT_AVATAR}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    onError={(e) => {
                        e.currentTarget.src = S.DEFAULT_AVATAR;
                    }}
                />
                <S.UserInfo>
                    <S.UserName>
                        {user?.firstName} {user?.lastName}
                    </S.UserName>
                    <S.UserEmail>{user?.email}</S.UserEmail>
                </S.UserInfo>
                <Button onClick={handleUserAccount} title={'User Account'}/>
                <Button onClick={handleUserMessage} title={'Send Message'}/>
            </S.UserHeader>

            <S.PostsSection>
                <S.PostsTitle>Recent Posts</S.PostsTitle>

                {isLoading ? (
                    <S.LoadingMessage>
                        Loading posts...
                    </S.LoadingMessage>
                ) : postsError ? (
                    <S.ErrorMessage>
                        Failed to load posts
                    </S.ErrorMessage>
                ) : posts?.length > 0 ? (
                    <S.PostsGrid>
                        {posts?.map((post) => (
                            <S.PostCard key={post.id} onClick={() => handlePostClick(post)}>
                                <S.PostTitle>{post.title}</S.PostTitle>

                                <S.PostBody>{post.body}</S.PostBody>

                                {post.tags && post.tags.length > 0 && (
                                    <S.PostTags>
                                        {post.tags.slice(0, 5).map((tag, index) => (
                                            <S.Tag key={index}>{tag}</S.Tag>
                                        ))}
                                    </S.PostTags>
                                )}

                                <S.Reactions>
                                    <S.ReactionItem>
                                        <span role="img" aria-label="likes">👍</span>
                                        <span>{post.reactions.likes}</span>
                                    </S.ReactionItem>
                                    <S.ReactionItem>
                                        <span role="img" aria-label="dislikes">👎</span>
                                        <span>{post.reactions.dislikes}</span>
                                    </S.ReactionItem>
                                </S.Reactions>
                            </S.PostCard>
                        ))}
                    </S.PostsGrid>
                ) : (
                    <S.NoPostsMessage>
                        No posts yet
                    </S.NoPostsMessage>
                )}
            </S.PostsSection>
        </S.UserCard>
            <PostModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
});