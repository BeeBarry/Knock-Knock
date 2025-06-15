
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, MessageSquare } from 'lucide-react';
import { User, Message, Chat } from '../types/community';
import { mockUsers } from '../data/mockData';
import Header from '../components/Header';

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser as User;

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      participants: [mockUsers[0], mockUsers[1]],
      messages: [
        {
          id: '1',
          senderId: mockUsers[0].id,
          content: "Hi! I saw you offer bike repair help. My bike chain keeps slipping - any advice?",
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2',
          senderId: mockUsers[1].id,
          content: "Hey there! Happy to help! Chain slipping usually means it needs adjustment or the chain is worn. I'm free this weekend if you'd like me to take a look?",
          timestamp: new Date(Date.now() - 3000000).toISOString()
        }
      ],
      lastMessage: "Hey there! Happy to help! Chain slipping usually means...",
      updatedAt: new Date(Date.now() - 3000000).toISOString()
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedUser && !chats.find(chat => 
      chat.participants.some(p => p.id === selectedUser.id)
    )) {
      // Create new chat with selected user
      const newChat: Chat = {
        id: Date.now().toString(),
        participants: [selectedUser],
        messages: [],
        lastMessage: '',
        updatedAt: new Date().toISOString()
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChat(newChat);
    }
  }, [selectedUser, chats]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      content: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, message],
      lastMessage: newMessage.trim(),
      updatedAt: new Date().toISOString()
    };

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    ));
    setSelectedChat(updatedChat);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={true} title="Messages" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-card rounded-3xl shadow-lg shadow-orange-100/20 dark:shadow-orange-950/20 border border-border overflow-hidden h-[600px]">
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Your Conversations
                </h3>
              </div>
              
              <div className="overflow-y-auto h-full">
                {chats.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No conversations yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start by knocking on someone's profile!
                    </p>
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full p-4 text-left hover:bg-muted/30 transition-colors border-b border-border/50 ${
                        selectedChat?.id === chat.id ? 'bg-[hsl(var(--coral))]/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {chat.participants.length > 0 && (
                          <img 
                            src={chat.participants[0].avatar} 
                            alt={chat.participants[0].name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {chat.participants[0]?.name || 'New Chat'}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage || 'Say hello! 👋'}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border bg-muted/10">
                    <div className="flex items-center gap-3">
                      {selectedChat.participants.length > 0 && (
                        <img 
                          src={selectedChat.participants[0].avatar} 
                          alt={selectedChat.participants[0].name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {selectedChat.participants[0]?.name || 'New Chat'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.participants[0]?.profession}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChat.messages.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">👋</div>
                        <p className="text-muted-foreground">
                          Start the conversation! Say hello to your neighbor.
                        </p>
                      </div>
                    ) : (
                      selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.senderId === 'current-user'
                                ? 'bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] text-white'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === 'current-user' ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a friendly message..."
                        className="warm-input flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] 
                                 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-orange-200/50 
                                 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 
                                 disabled:transform-none disabled:shadow-none flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Welcome to Messages! 💬
                    </h3>
                    <p className="text-muted-foreground">
                      Select a conversation to start chatting with your neighbors
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
