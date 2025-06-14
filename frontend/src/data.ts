import type {User, Chat, } from './types';

export const currentUser: User = {
    id: 'zane-1',
    name: 'Mr. Zane',
    profession: 'Software Engineer',
    location: 'Gothenburg',
    expertise: ['Bicycles', 'Writing', 'Home network'],
    previouslyHelped: [
        { personName: 'Maria', helpType: 'bicycle recommendations', daysAgo: 2 },
        { personName: 'Lennart', helpType: 'WIFI problems', daysAgo: 6 }
    ],
    distance: 0,
    bio: 'Glad to help you out, there are no stupid questions! :)'
};

export const communityUsers: User[] = [
    {
        id: 'anna-1',
        name: 'Anna Svensson',
        profession: 'Chef',
        location: 'Gothenburg',
        expertise: ['cooking', 'writing'],
        previouslyHelped: [],
        distance: 0.5
    },
    {
        id: 'erik-1',
        name: 'Erik Johansson',
        profession: 'IT Consultant',
        location: 'Gothenburg',
        expertise: ['computers', 'bicycling'],
        previouslyHelped: [],
        distance: 1.2
    },
    {
        id: 'lisa-1',
        name: 'Lisa Andersson',
        profession: 'Graphic Designer',
        location: 'Gothenburg',
        expertise: ['running', 'drawing'],
        previouslyHelped: [],
        distance: 2.1
    },
    {
        id: 'magnus-1',
        name: 'Magnus Berg',
        profession: 'Bike Mechanic',
        location: 'Gothenburg',
        expertise: ['bicycling', 'computers'],
        previouslyHelped: [],
        distance: 3.5
    }
];

export const mockChats: Chat[] = [
    {
        id: 'chat-1',
        participants: [currentUser, communityUsers[0]],
        messages: [
            {
                id: 'msg-1',
                senderId: 'anna-1',
                content: 'Tack så mycket för hjälpen med cykeln!',
                timestamp: '2025-06-14T10:30:00Z'
            }
        ],
        lastMessage: {
            id: 'msg-1',
            senderId: 'anna-1',
            content: 'Tack så mycket för hjälpen med cykeln!',
            timestamp: '2025-06-14T10:30:00Z'
        },
        updatedAt: '2025-06-14T10:30:00Z'
    },
    {
        id: 'chat-2',
        participants: [currentUser, communityUsers[1]],
        messages: [
            {
                id: 'msg-2',
                senderId: 'erik-1',
                content: 'Hej, kan du hjälpa mig med wifi igen?',
                timestamp: '2025-06-14T09:15:00Z'
            }
        ],
        lastMessage: {
            id: 'msg-2',
            senderId: 'erik-1',
            content: 'Hej, kan du hjälpa mig med wifi igen?',
            timestamp: '2025-06-14T09:15:00Z'
        },
        updatedAt: '2025-06-14T09:15:00Z'
    }
];

export const expertiseCategories = [
    'Alla',
    'Bicycling',
    'Writing',
    'Cooking',
    'Computers',
    'Running',
    'Drawing'
];