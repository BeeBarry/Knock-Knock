// src/components/ChatInput.tsx
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (content: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Skriv ett meddelande..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-600"
                />
                <button
                    onClick={handleSend}
                    className="p-2 bg-orange-600 text-white rounded-lg"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}