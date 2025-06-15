
import { User, CommunityStats } from '../types/community';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    profession: 'Software Developer',
    location: 'Oak Street',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c6fd?w=150&h=150&fit=crop&crop=face',
    expertise: ['Web Development', 'Computer Repair', 'Tech Support'],
    bio: 'Love helping neighbors with tech troubles! Available most evenings and weekends.',
    previouslyHelped: [
      { id: '1', task: 'Fixed laptop virus', date: '2024-03-15', rating: 5 },
      { id: '2', task: 'Set up home WiFi', date: '2024-03-10', rating: 5 }
    ],
    availability: true,
    distance: 0.2,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    profession: 'Chef',
    location: 'Maple Avenue',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    expertise: ['Cooking', 'Meal Planning', 'Kitchen Equipment'],
    bio: 'Professional chef who loves sharing cooking tips and helping with meal prep!',
    previouslyHelped: [
      { id: '1', task: 'Cooking lesson', date: '2024-03-18', rating: 5 },
      { id: '2', task: 'Kitchen knife sharpening', date: '2024-03-12', rating: 4 }
    ],
    availability: false,
    distance: 0.4,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    profession: 'Gardener',
    location: 'Pine Road',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    expertise: ['Gardening', 'Plant Care', 'Composting', 'Landscaping'],
    bio: 'Green thumb enthusiast! Happy to help with plant problems and garden design.',
    previouslyHelped: [
      { id: '1', task: 'Garden design consultation', date: '2024-03-20', rating: 5 },
      { id: '2', task: 'Plant disease diagnosis', date: '2024-03-14', rating: 5 }
    ],
    availability: true,
    distance: 0.6,
    rating: 5.0
  },
  {
    id: '4',
    name: 'David Kim',
    profession: 'Handyman',
    location: 'Cedar Lane',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    expertise: ['Home Repair', 'Plumbing', 'Electrical', 'Carpentry'],
    bio: 'Retired contractor with 30+ years experience. Love helping with home projects!',
    previouslyHelped: [
      { id: '1', task: 'Fixed leaky faucet', date: '2024-03-19', rating: 5 },
      { id: '2', task: 'Installed ceiling fan', date: '2024-03-16', rating: 4 }
    ],
    availability: true,
    distance: 0.8,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Amy Thompson',
    profession: 'Yoga Instructor',
    location: 'Birch Street',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    expertise: ['Yoga', 'Meditation', 'Wellness', 'Stress Relief'],
    bio: 'Certified yoga instructor offering free sessions to neighbors. Namaste! 🧘‍♀️',
    previouslyHelped: [
      { id: '1', task: 'Private yoga lesson', date: '2024-03-17', rating: 5 },
      { id: '2', task: 'Meditation guidance', date: '2024-03-11', rating: 5 }
    ],
    availability: true,
    distance: 1.1,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Robert Williams',
    profession: 'Music Teacher',
    location: 'Elm Drive',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    expertise: ['Guitar', 'Piano', 'Music Theory', 'Songwriting'],
    bio: 'Music teacher with a passion for helping others discover their musical talents.',
    previouslyHelped: [
      { id: '1', task: 'Guitar tuning lesson', date: '2024-03-13', rating: 4 },
      { id: '2', task: 'Piano basics', date: '2024-03-08', rating: 5 }
    ],
    availability: false,
    distance: 1.3,
    rating: 4.6
  }
];

export const mockStats: CommunityStats = {
  totalMembers: 156,
  helpSessionsThisWeek: 23,
  skillsShared: 89,
  neighborsHelped: 142
};
