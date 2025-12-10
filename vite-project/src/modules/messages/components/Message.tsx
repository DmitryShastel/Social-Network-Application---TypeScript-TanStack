import React, {useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "@tanstack/react-router";
import {MessageData} from "../types/message";
import {useWebSocket} from "../../../ws/useWebsocket";
import UserStore from "../../../stores/user.store";
import * as S from "../styles/messages";


export const Message = observer(() => {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState<MessageData[]>([
        {id: 1, text: 'Hi! What is up?', sender: 'other', timestamp: '10:00'},
        {id: 2, text: 'hi there! everything fine!', sender: 'user', timestamp: '10:01'},
    ]);

    const {user} = UserStore
    const {userId} = useParams({from: '/message/$userId/'})

    const {sendMessage, isConnected} = useWebSocket(
        "wss://ws.ifelse.io",
        useCallback((receivedMessage: string) => {
            const newMessage: MessageData = {
                id: Date.now(),
                text: receivedMessage,
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            }
            setMessages(prev => [...prev, newMessage])
        }, []),
        {
            reconnectInterval: 60000,
            maxReconnectAttempts: 10,
            shouldReconnect: true,
        }
    )

    useEffect(() => {
        if (userId) {
            const id = parseInt(userId)
            UserStore.currentUser(id);
        }
    }, [userId]);

    const handlerOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleSendMessage = () => {
        if (!value.trim()) return

        const newMessage: MessageData = {
            id: Date.now(),
            text: value,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        }

        sendMessage(value)

        setMessages(prev => [...prev, newMessage])
        setValue('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!user) {
        return (
            <S.PageContainer>
                <S.LoadingContainer>
                    User's chat is loading...
                </S.LoadingContainer>
            </S.PageContainer>
        );
    }

    return (
        <S.PageContainer>
            <S.ChatHeader>
                <S.Avatar src={user?.image}>
                    {!user?.image && user?.firstName.charAt(0)}
                </S.Avatar>
                <div>
                    <S.UserName>{user?.firstName}</S.UserName>
                    <S.UserStatus>
                        {isConnected ? 'online • connected' : 'connecting...'}
                    </S.UserStatus>
                </div>
            </S.ChatHeader>
            <S.MessagesContainer>
                {messages.map((message) => (
                    <div key={message.id}>
                        <S.MessageBubble sender={message.sender}>
                            {message.text}
                        </S.MessageBubble>
                        <S.MessageTime sender={message.sender}>
                            {message.timestamp}
                        </S.MessageTime>
                    </div>
                ))}
            </S.MessagesContainer>
            <S.InputForm onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                handleSendMessage()
            }}>
                <S.Input
                    type="text"
                    value={value}
                    onChange={handlerOnchange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your message..."
                    disabled={!isConnected}
                    autoFocus
                />
                <S.SendButton type="submit" onClick={handleSendMessage} disabled={!isConnected}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Send
                </S.SendButton>
            </S.InputForm>
        </S.PageContainer>
    );
});