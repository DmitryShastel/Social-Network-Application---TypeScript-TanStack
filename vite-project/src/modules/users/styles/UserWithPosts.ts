import styled from "@emotion/styled";

// default avatar
export const DEFAULT_AVATAR = 'https://via.placeholder.com/50/667eea/ffffff?text=U';

export const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #667eea;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 0.25rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const UserEmail = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

export const PostsSection = styled.div`
  margin-top: 1rem;
`;

export const PostsTitle = styled.h3`
  font-size: 1.2rem;
  color: #667eea;
  margin: 0 0 1rem 0;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

export const PostCard = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

export const PostTitle = styled.h4`
  font-size: 1rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostBody = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const Tag = styled.span`
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const Reactions = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 0.85rem;
`;

export const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #d32f2f;
`;

export const NoPostsMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;