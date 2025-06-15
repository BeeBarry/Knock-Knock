
import { User, PreviousHelp } from '../types/community';
import { Profile, HelpHistory } from '../types/backend';

// Map backend Profile to frontend User
export const mapProfileToUser = (profile: Profile): User => {
  return {
    id: profile.id,
    name: profile.fullName,
    profession: profile.title || 'Community Member',
    location: profile.location || 'Unknown Location',
    avatar: profile.avatarUrl || '',
    expertise: profile.expertise.map(exp => exp.name),
    bio: `Hello! I'm ${profile.firstName} and I love helping neighbors.`,
    previouslyHelped: profile.previousHelps.map(mapHelpHistoryToPreviousHelp),
    availability: true, // Default to available since backend doesn't track this
    distance: 0.5, // Default distance since backend doesn't track this
    rating: 4.8 // Default rating since backend doesn't track this
  };
};

// Map backend HelpHistory to frontend PreviousHelp
export const mapHelpHistoryToPreviousHelp = (help: HelpHistory): PreviousHelp => {
  return {
    id: help.withUserName + help.dateUtc, // Generate unique ID
    task: help.topic,
    date: new Date(help.dateUtc).toLocaleDateString(),
    rating: 5 // Default rating since backend doesn't track this
  };
};

// Map frontend User to backend ProfileDTO for updates
export const mapUserToProfileDTO = (user: User, firstName?: string, lastName?: string): any => {
  return {
    firstName: firstName || user.name.split(' ')[0] || '',
    lastName: lastName || user.name.split(' ').slice(1).join(' ') || '',
    title: user.profession,
    avatarUrl: user.avatar,
    location: user.location,
    expertise: user.expertise.map(skill => ({ name: skill, icon: '' })),
    previousHelps: user.previouslyHelped.map(help => ({
      withUserName: 'Unknown',
      topic: help.task,
      dateUtc: new Date(help.date).toISOString()
    }))
  };
};
