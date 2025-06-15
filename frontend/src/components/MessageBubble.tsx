// src/components/MessageBubble.tsx
// src/components/MessageBubble.tsx
import type {Message} from '../types';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                    isOwn
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                }`}
            >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-orange-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
        </div>
    );
}