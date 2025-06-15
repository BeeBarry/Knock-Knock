
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Star, MessageSquare, User, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Header from '../components/Header';
import { profileService } from '../services/profiles';
import { mapProfileToUser } from '../utils/dataMapping';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Fetch user profile by username (assuming userId is actually username for now)
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.getProfileByUsername(userId!),
    enabled: !!userId
  });

  const user = profile ? mapProfileToUser(profile) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton={true} title="Loading Profile..." />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[hsl(var(--coral))]/30 border-t-[hsl(var(--coral))] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton={true} title="Profile Not Found" />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Profile not found
            </h3>
            <p className="text-muted-foreground mb-4">
              The user profile you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/community')}
              className="btn-warm"
            >
              Back to Community
            </button>
          </div>
        </main>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMessage = () => {
    navigate('/messages', { state: { selectedUser: user } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={true} title={`${user.name}'s Profile`} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="community-card max-w-2xl mx-auto">
          {/* Profile Picture and Basic Info */}
          <div className="text-center mb-8">
            <Avatar className="w-32 h-32 mx-auto mb-4 shadow-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--coral))] to-[hsl(var(--sage))] text-white font-semibold text-3xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{user.profession}</p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[hsl(var(--coral))]" />
                <span className="text-muted-foreground">{user.location} • {user.distance} miles away</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[hsl(var(--sunny))] text-[hsl(var(--sunny))]" />
                <span className="font-medium text-foreground">{user.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-4 h-4 rounded-full ${
                user.availability ? 'bg-[hsl(var(--sage))]' : 'bg-muted'
              }`} />
              <span className="text-foreground font-medium">
                {user.availability ? 'Available now' : 'Currently busy'}
              </span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[hsl(var(--sage))]" />
              About {user.name.split(' ')[0]}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
          </div>

          {/* Expertise Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-[hsl(var(--sunny))]" />
              Expertise & Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {user.expertise.map((skill, index) => (
                <span key={index} className="expertise-badge text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Previous Help Section */}
          {user.previouslyHelped && user.previouslyHelped.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Recent Help Provided
              </h3>
              <div className="space-y-3">
                {user.previouslyHelped.slice(0, 3).map((help) => (
                  <div key={help.id} className="bg-muted/30 dark:bg-muted/20 rounded-2xl p-4 border border-border/30">
                    <div className="flex items-center justify-between">
                      <p className="text-foreground font-medium">{help.task}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[hsl(var(--sunny))] text-[hsl(var(--sunny))]" />
                        <span className="text-sm font-medium">{help.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{help.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button 
              onClick={handleMessage}
              className="btn-warm flex items-center gap-2 mx-auto"
            >
              <MessageSquare className="w-5 h-5" />
              Send a Knock to {user.name.split(' ')[0]}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
