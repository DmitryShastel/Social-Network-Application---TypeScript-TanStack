import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {Post} from "../types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 24px;
  font-weight: 300;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  &::before {
    content: "×";
    line-height: 1;
  }
`;

const ModalHeader = styled.div`
  padding: 2.5rem 2.5rem 1rem;
  position: relative;
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
  padding-right: 3rem;
`;

const ModalBody = styled.div`
  padding: 0 2.5rem 2.5rem;
`;

const PostBody = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 2rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ReactionsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const ReactionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  min-width: 120px;
`;

const ReactionIcon = styled.span`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReactionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReactionLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
`;

const ReactionCount = styled.span`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StatIcon = styled.span`
  margin-right: 0.5rem;
`;

interface PostModalProps {
    post: Post | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PostModal({
                              post,
                              isOpen,
                              onClose,
                          }: PostModalProps) {

    const [like, setLike] = useState<number>(post?.reactions?.likes || 0)
    const [dislike, setDislike] = useState<number>(post?.reactions?.dislikes || 0)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);
    useEffect(() => {
        if (post) {
            setLike(post.reactions.likes);
            setDislike(post?.reactions?.dislikes)
        }
    }, [post]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handelLike = () => {
        alert('The like count is increased')
    }
    const handelDislike = () => {
        alert('The dislike count is increased')
    }

    if (!isOpen || !post) return null;

    const totalReactions = post.reactions.likes + post.reactions.dislikes;
    const likesPercentage = totalReactions > 0
        ? Math.round((post.reactions.likes / totalReactions) * 100)
        : 0;

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            <ModalContent>
                <CloseButton onClick={onClose} aria-label="Close modal"/>

                <ModalHeader>
                    <ModalTitle>{post.title}</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <PostBody>{post.body}</PostBody>

                    {post.tags && post.tags.length > 0 && (
                        <TagsContainer>
                            {post.tags.map((tag, index) => (
                                <Tag key={index}>#{tag}</Tag>
                            ))}
                        </TagsContainer>
                    )}

                    <ReactionsContainer>
                        <ReactionItem>
                            <ReactionIcon>👍</ReactionIcon>
                            <ReactionContent>
                                <ReactionLabel>Likes</ReactionLabel>
                                <ReactionCount
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelLike();
                                    }}
                                >{like}</ReactionCount>
                            </ReactionContent>
                        </ReactionItem>

                        <ReactionItem>
                            <ReactionIcon>👎</ReactionIcon>
                            <ReactionContent>
                                <ReactionLabel>Dislikes</ReactionLabel>
                                <ReactionCount
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelDislike();
                                    }}
                                >{dislike}</ReactionCount>
                            </ReactionContent>
                        </ReactionItem>

                        <ReactionItem>
                            <ReactionIcon>👁️</ReactionIcon>
                            <ReactionContent>
                                <ReactionLabel>Views</ReactionLabel>
                                <ReactionCount>{post.views}</ReactionCount>
                            </ReactionContent>
                        </ReactionItem>
                    </ReactionsContainer>

                    <StatsContainer>
                        <StatItem>
                            <StatLabel>Post ID</StatLabel>
                            <StatValue>
                                <StatIcon>#️⃣</StatIcon>
                                {post.id}
                            </StatValue>
                        </StatItem>

                        <StatItem>
                            <StatLabel>Author</StatLabel>
                            <StatValue>
                                <StatIcon>👤</StatIcon>
                                User {post.userId}
                            </StatValue>
                        </StatItem>

                        <StatItem>
                            <StatLabel>Total Reactions</StatLabel>
                            <StatValue>
                                <StatIcon>💥</StatIcon>
                                {totalReactions}
                            </StatValue>
                        </StatItem>

                        <StatItem>
                            <StatLabel>Likes Ratio</StatLabel>
                            <StatValue>
                                <StatIcon>📈</StatIcon>
                                {likesPercentage}%
                            </StatValue>
                        </StatItem>
                    </StatsContainer>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
}