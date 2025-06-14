export interface User {
    id: string;
    name: string;
    profession: string;
    location: string;
    avatar?: string;
    expertise: string[];
    previouslyHelped: PreviousHelp[];
    distance: number;
    bio?: string;
}

export interface PreviousHelp {
    personName: string;
    helpType: string;
    daysAgo: number;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

export interface Chat {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessage?: Message;
    updatedAt: string;
}