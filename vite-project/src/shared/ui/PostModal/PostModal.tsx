import {useEffect, useState} from "react";
import {Post} from "../../../modules/posts/types";
import {toast, ToastContainer} from "react-toastify";
import * as S from "./styles/postModal";

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
        toast('The like count is increased')
    }

    const handelDislike = () => {
        toast('The dislike count is increased')
    }

    if (!isOpen || !post) return null;

    const totalReactions = post.reactions.likes + post.reactions.dislikes;
    const likesPercentage = totalReactions > 0
        ? Math.round((post.reactions.likes / totalReactions) * 100)
        : 0;

    return (
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.ModalContent>
                <ToastContainer/>
                <S.CloseButton onClick={onClose} aria-label="Close modal"/>

                <S.ModalHeader>
                    <S.ModalTitle>{post.title}</S.ModalTitle>
                </S.ModalHeader>

                <S.ModalBody>
                    <S.PostBody>{post.body}</S.PostBody>

                    {post.tags && post.tags.length > 0 && (
                        <S.TagsContainer>
                            {post.tags.map((tag, index) => (
                                <S.Tag key={index}>#{tag}</S.Tag>
                            ))}
                        </S.TagsContainer>
                    )}

                    <S.ReactionsContainer>
                        <S.ReactionItem>
                            <S.ReactionIcon>👍</S.ReactionIcon>
                            <S.ReactionContent>
                                <S.ReactionLabel>Likes</S.ReactionLabel>
                                <S.ReactionCount
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelLike();
                                    }}
                                >{like}</S.ReactionCount>
                            </S.ReactionContent>
                        </S.ReactionItem>

                        <S.ReactionItem>
                            <S.ReactionIcon>👎</S.ReactionIcon>
                            <S.ReactionContent>
                                <S.ReactionLabel>Dislikes</S.ReactionLabel>
                                <S.ReactionCount
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelDislike();
                                    }}
                                >{dislike}</S.ReactionCount>
                            </S.ReactionContent>
                        </S.ReactionItem>

                        <S.ReactionItem>
                            <S.ReactionIcon>👁️</S.ReactionIcon>
                            <S.ReactionContent>
                                <S.ReactionLabel>Views</S.ReactionLabel>
                                <S.ReactionCount>{post.views}</S.ReactionCount>
                            </S.ReactionContent>
                        </S.ReactionItem>
                    </S.ReactionsContainer>

                    <S.StatsContainer>
                        <S.StatItem>
                            <S.StatLabel>Post ID</S.StatLabel>
                            <S.StatValue>
                                <S.StatIcon>#️⃣</S.StatIcon>
                                {post.id}
                            </S.StatValue>
                        </S.StatItem>

                        <S.StatItem>
                            <S.StatLabel>Author</S.StatLabel>
                            <S.StatValue>
                                <S.StatIcon>👤</S.StatIcon>
                                User {post.userId}
                            </S.StatValue>
                        </S.StatItem>

                        <S.StatItem>
                            <S.StatLabel>Total Reactions</S.StatLabel>
                            <S.StatValue>
                                <S.StatIcon>💥</S.StatIcon>
                                {totalReactions}
                            </S.StatValue>
                        </S.StatItem>

                        <S.StatItem>
                            <S.StatLabel>Likes Ratio</S.StatLabel>
                            <S.StatValue>
                                <S.StatIcon>📈</S.StatIcon>
                                {likesPercentage}%
                            </S.StatValue>
                        </S.StatItem>
                    </S.StatsContainer>
                </S.ModalBody>
            </S.ModalContent>
        </S.ModalOverlay>
    );
}