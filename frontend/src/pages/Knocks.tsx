// src/pages/Knocks.tsx
import { useNavigate } from 'react-router';
import { mockChats } from '../data';

export default function Knocks() {
    const navigate = useNavigate();

    const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const handleChatClick = (chatId: string) => {
        navigate(`/chat/existing/${chatId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-200 p-4">
                <h1 className="text-xl font-semibold text-center">Knocks</h1>
            </div>

            <div className="p-4 space-y-3">
                {mockChats.map(chat => {
                    const otherUser = chat.participants.find(p => p.id !== 'zane-1');
                    return (
                        <div
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)}
                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {otherUser?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{otherUser?.name}</h3>
                                    <p className="text-sm text-gray-600 truncate">
                                        {chat.lastMessage?.content}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500">
                  {chat.lastMessage && formatTimeAgo(chat.lastMessage.timestamp)}
                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}