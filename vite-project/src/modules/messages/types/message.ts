export interface SendMessageData {
    type: 'message:send';
    recipientId: string;
    content: string;
}

export interface ReceiveMessageData {
    type: 'message:receive';
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    createdAt: string;
}

export interface MessageData {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
}
