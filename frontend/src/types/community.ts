
export interface User {
  id: string;
  name: string;
  profession: string;
  location: string;
  avatar: string;
  expertise: string[];
  bio: string;
  previouslyHelped: PreviousHelp[];
  availability: boolean;
  distance: number;
  rating: number;
}

export interface PreviousHelp {
  id: string;
  task: string;
  date: string;
  rating: number;
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
  lastMessage: string;
  updatedAt: string;
}

export interface CommunityStats {
  totalMembers: number;
  helpSessionsThisWeek: number;
  skillsShared: number;
  neighborsHelped: number;
}
