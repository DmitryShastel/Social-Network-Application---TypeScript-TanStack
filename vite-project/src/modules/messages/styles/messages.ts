import styled from '@emotion/styled';
import {css} from '@emotion/react';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ChatHeader = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

interface AvatarProps {
    src?: string;
}

export const Avatar = styled.div<AvatarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.src
          ? `url(${props.src}) center/cover`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  max-width: 70vh;
  gap: 8px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

export const messageStyles = {
    user: css`
      align-self: flex-end;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 18px 18px 18px 18px;
      margin-left: auto; 
      max-width: 50%;
    `,
    other: css`
      align-self: flex-start;
      background: white;
      color: #333;
      border-radius: 18px 18px 18px 18px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      margin-right: auto; 
      max-width: 50%;
    `
};

interface MessageBubbleProps {
    sender: 'user' | 'other';
}

export const MessageBubble = styled.div<MessageBubbleProps>`
  max-width: 70%;
  padding: 12px 16px;
  word-wrap: break-word;
  position: relative;
  ${props => messageStyles[props.sender]};

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.sender === 'user' ? 'right: -8px;' : 'left: -8px;'}
    width: 16px;
    height: 16px;
    background: inherit;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
`;

export const MessageTime = styled.div<MessageBubbleProps>`
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: ${props => props.sender === 'user' ? 'right' : 'left'};
`;

export const InputForm = styled.form`
  display: flex;
  max-width: 70vh;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const SendButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-size: 18px;
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const UserStatus = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.7;
  color: #667eea;
`;