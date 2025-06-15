
// TypeScript interfaces matching C# backend models

export interface Account {
  id: string;
  userId: string;
  username: string;
  password: string;
}

export interface AccountDTO {
  username: string;
  password: string;
}

export interface Expertise {
  name: string;
  icon: string;
}

export interface HelpHistory {
  withUserName: string;
  topic: string;
  dateUtc: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  avatarUrl: string;
  location: string;
  expertise: Expertise[];
  previousHelps: HelpHistory[];
}

export interface ProfileDTO {
  firstName: string;
  lastName: string;
  title: string;
  avatarUrl: string;
  location: string;
  expertise: Expertise[];
  previousHelps: HelpHistory[];
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
