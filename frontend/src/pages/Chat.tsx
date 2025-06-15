// src/pages/Chat.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockChats, communityUsers, currentUser } from '../data';
import type {Chat as ChatType, Message} from '../types';
import ChatView from '../components/ChatView';

export default function Chat() {
    const { userId, chatId } = useParams();
    const navigate = useNavigate();
    const [chat, setChat] = useState<ChatType | undefined>();
    const [otherUser, setOtherUser] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        if (chatId) {
            // Existing chat
            const existingChat = mockChats.find(c => c.id === chatId);
            if (existingChat) {
                setChat(existingChat);
                const other = existingChat.participants.find(p => p.id !== currentUser.id);
                if (other) setOtherUser({ id: other.id, name: other.name });
            }
        } else if (userId) {
            // New chat
            const user = communityUsers.find(u => u.id === userId);
            if (user) {
                setOtherUser({ id: user.id, name: user.name });
                // Check if chat already exists
                const existingChat = mockChats.find(c =>
                    c.participants.some(p => p.id === userId)
                );
                setChat(existingChat);
            }
        }
    }, [userId, chatId]);

    const handleSendMessage = (content: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            content,
            timestamp: new Date().toISOString()
        };

        if (chat) {
            setChat({
                ...chat,
                messages: [...chat.messages, newMessage],
                lastMessage: newMessage,
                updatedAt: new Date().toISOString()
            });
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!otherUser) return <div>Loading...</div>;

    return (
        <ChatView
            chat={chat}
            otherUser={otherUser}
            onBack={handleBack}
            onSendMessage={handleSendMessage}
        />
    );
}