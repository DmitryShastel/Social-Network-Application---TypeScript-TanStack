import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import UserStore from "../../../stores/user.store";
import {observer} from "mobx-react-lite";
import {useParams} from "@tanstack/react-router";
import {MessageData} from "../types/message"


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ChatHeader = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div<{ src?: string }>`
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

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const messageStyles = {
    user: css`
      align-self: flex-end;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 18px 18px 4px 18px;
    `,
    other: css`
      align-self: flex-start;
      background: white;
      color: #333;
      border-radius: 18px 18px 18px 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    `
};

const MessageBubble = styled.div<{ sender: 'user' | 'other' }>`
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

const MessageTime = styled.div<{ sender: 'user' | 'other' }>`
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: ${props => props.sender === 'user' ? 'right' : 'left'};
`;

const InputForm = styled.form`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
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

const SendButton = styled.button`
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


export const Message = observer(() => {
    const [messages, setMessages] = useState<MessageData[]>([
        {id: 1, text: 'Hi! What is up?', sender: 'other', timestamp: '10:00'},
        {id: 2, text: 'hi there! everything fine!', sender: 'user', timestamp: '10:01'},
    ]);

    const {user} = UserStore
    const {userId} = useParams({from: '/message/$userId/'})

    useEffect(() => {
        if (userId) {
            const id = parseInt(userId)
            UserStore.currentUser(id);
        }
    }, [userId]);

    console.log(user)

    if (!user) {
        return (
            <PageContainer>
                <div css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'white',
                    fontSize: '18px'
                }}>
                    User's chat is loading...
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <ChatHeader>
                <Avatar src={user?.image}>
                    {!user?.image && user?.firstName.charAt(0)}
                </Avatar>
                <div>
                    <h2 css={{margin: 0, fontSize: '16px', fontWeight: 600}}>{user?.firstName}</h2>
                    <p css={{margin: 0, fontSize: '12px', opacity: 0.7, color: '#667eea'}}>
                        online • typing...
                    </p>
                </div>
            </ChatHeader>

            <MessagesContainer>
                {messages.map((message) => (
                    <div key={message.id}>
                        <MessageBubble sender={message.sender}>
                            {message.text}
                        </MessageBubble>
                        <MessageTime sender={message.sender}>
                            {message.timestamp}
                        </MessageTime>
                    </div>
                ))}

            </MessagesContainer>

            <InputForm onSubmit={() => {
            }}>
                <Input
                    type="text"
                    value={''}
                    onChange={() => {
                    }}
                    onKeyPress={() => {
                    }}
                    placeholder="Enter your message..."
                    disabled={false}
                    autoFocus
                />
                <SendButton type="submit">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send
                </SendButton>
            </InputForm>
        </PageContainer>
    );
});

