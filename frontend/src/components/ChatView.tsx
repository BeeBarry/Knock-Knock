// src/components/ChatView.tsx
import { ArrowLeft, User } from 'lucide-react';
import type { Chat } from '../types';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';

interface ChatViewProps {
    chat?: Chat;
    otherUser: { id: string; name: string };
    onBack: () => void;
    onSendMessage: (content: string) => void;
}

export default function ChatView({ chat, otherUser, onBack, onSendMessage }: ChatViewProps) {
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
                <button onClick={onBack} className="mr-3">
                    <ArrowLeft size={24} />
                </button>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <User size={20} />
                </div>
                <h1 className="text-lg font-medium">{otherUser.name}</h1>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat?.messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.senderId !== otherUser.id}
                    />
                ))}
            </div>

            {/* Input */}
            <ChatInput onSendMessage={onSendMessage} />
        </div>
    );
}