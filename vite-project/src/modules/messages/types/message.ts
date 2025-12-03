// Send message
// {
//     type: 'message:send',
//         recipientId: 'user-id',
//     content: 'message text'
// }
//
// // Receive message
// {
//     type: 'message:receive',
//         id: 'message-id',
//     senderId: 'user-id',
//     senderName: 'User Name',
//     content: 'message text',
//     createdAt: '2024-01-01T00:00:00.000Z'
// }

export interface MessageData {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
}
