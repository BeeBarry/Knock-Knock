export interface User {
    id: string; // MongoDB ObjectId for the profile
    firstName: string; // First name of the user
    lastName: string; // Last name of the user
    fullName: string; // Full name of the user
    title: string; // Title or profession of the user
    avatarUrl?: string; // Optional avatar URL
    location: string; // Location of the user
    expertise: Expertise[]; // List of expertise areas
    previousHelps: HelpHistory[]; // List of previous help history
}

export interface Expertise {
    name: string; // Name of the expertise (e.g., "good boy")
    icon: string; // Icon representing the expertise (e.g., "🚲")
}

export interface HelpHistory {
    withUserName: string; // Name of the person helped (e.g., "Alice")
    topic: string; // Topic of the help (e.g., "bike tuning")
    dateUtc: string; // ISO date string for when the help occurred
}

export interface Message {
    id: string; // MongoDB ObjectId
    chat: string; // Reference to the Chat ObjectId
    username: string; // Username of the sender
    text: string; // Message content
    timestamp: string; // ISO date string for the message timestamp
}

export interface Chat {
    id: string;
    participants: User[];
    messages: Message[];
    lastMessage?: Message;
    updatedAt: string;
}
export interface LoginResponse {
    Id: string; // MongoDB ObjectId for the login session
    UserId: string; // MongoDB ObjectId for the user
    Username: string; // Username of the logged-in user
}