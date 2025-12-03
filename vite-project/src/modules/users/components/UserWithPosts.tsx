import styled from "@emotion/styled";
import {observer} from "mobx-react-lite";
import {User} from "../types/user";
import UserStore from "../../../stores/user.store";
import {useEffect} from "react";
import {Button} from "../../../shared/ui/Button/Button";
import {useRouter} from "@tanstack/react-router";


const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #667eea;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 0.25rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserEmail = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const PostsSection = styled.div`
  margin-top: 1rem;
`;

const PostsTitle = styled.h3`
  font-size: 1.2rem;
  color: #667eea;
  margin: 0 0 1rem 0;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const PostCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

const PostTitle = styled.h4`
  font-size: 1rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostBody = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Reactions = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 0.85rem;
`;

const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;


const DEFAULT_AVATAR = 'https://via.placeholder.com/50/667eea/ffffff?text=U';

interface UserWithPostsProps {
    user: User
    isLoading?: boolean
    postsError?: null
}

export const UserWithPosts = observer(({user, isLoading, postsError}: UserWithPostsProps) => {
    const router = useRouter()
    const posts = UserStore.getPostByUserId(user.id)

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
    }, [user.id])

    const handelUserAccount = () => {
        router.navigate({to: '/users/$userId', params: {userId: user.id}})
    }

    const handelUserMessage = () => {
        router.navigate({to: '/message/$userId/', params: {userId: user.id}})
    }


    return (
        <UserCard>
            <UserHeader>
                <UserAvatar
                    src={user?.image || DEFAULT_AVATAR}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    onError={(e) => {
                        e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                />
                <UserInfo>
                    <UserName>
                        {user?.firstName} {user?.lastName}
                    </UserName>
                    <UserEmail>{user?.email}</UserEmail>
                </UserInfo>
                <Button onClick={handelUserAccount} title={'User Account'}/>
                <Button onClick={handelUserMessage} title={'Send Message'}/>
            </UserHeader>

            <PostsSection>
                <PostsTitle>Recent Posts</PostsTitle>

                {isLoading ? (
                    <div style={{textAlign: 'center', padding: '1rem', color: '#666'}}>
                        Loading posts...
                    </div>
                ) : postsError ? (
                    <div style={{textAlign: 'center', padding: '1rem', color: '#d32f2f'}}>
                        Failed to load posts
                    </div>
                ) : posts?.length > 0 ? (
                    <PostsGrid>
                        {posts?.map((post) => (
                            <PostCard key={post.id}>
                                <PostTitle>{post.title}</PostTitle>

                                <PostBody>{post.body}</PostBody>

                                {post.tags && post.tags.length > 0 && (
                                    <PostTags>
                                        {post.tags.slice(0, 5).map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </PostTags>
                                )}

                                <Reactions>
                                    <ReactionItem>
                                        <span role="img" aria-label="likes">👍</span>
                                        <span>{post.reactions.likes}</span>
                                    </ReactionItem>
                                    <ReactionItem>
                                        <span role="img" aria-label="dislikes">👎</span>
                                        <span>{post.reactions.dislikes}</span>
                                    </ReactionItem>
                                </Reactions>
                            </PostCard>
                        ))}
                    </PostsGrid>
                ) : (
                    <div style={{textAlign: 'center', padding: '1rem', color: '#666'}}>
                        No posts yet
                    </div>
                )}
            </PostsSection>
        </UserCard>
    );
});