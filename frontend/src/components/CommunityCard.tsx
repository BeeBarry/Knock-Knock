
import { User } from '../types/community';
import { MessageSquare, MapPin, Star, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

interface CommunityCardProps {
  user: User;
  onMessage: (user: User) => void;
}

const CommunityCard = ({ user, onMessage }: CommunityCardProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="community-card">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--coral))] to-[hsl(var(--sage))] text-white font-semibold text-lg">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground flex-1 pr-2">
              {user.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-[hsl(var(--sunny))] text-[hsl(var(--sunny))]" />
              <span className="text-sm font-medium text-foreground">
                {user.rating}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[hsl(var(--coral))] flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {user.location} • {user.distance} miles away
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
              user.availability ? 'bg-[hsl(var(--sage))]' : 'bg-muted'
            }`} />
            <span className="text-sm text-muted-foreground">
              {user.availability ? 'Available now' : 'Busy'}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {user.bio}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {user.expertise.slice(0, 3).map((skill, index) => (
              <span key={index} className="expertise-badge">
                {skill}
              </span>
            ))}
            {user.expertise.length > 3 && (
              <span className="expertise-badge">
                +{user.expertise.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleViewProfile}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[hsl(var(--sage))] to-[hsl(var(--sage-light))] 
                         text-white px-3 py-1.5 rounded-xl text-sm font-medium
                         hover:shadow-lg hover:shadow-green-200/50 dark:hover:shadow-green-900/30
                         transform hover:scale-105 transition-all duration-200"
            >
              <UserRound className="w-4 h-4" />
              Profile
            </button>
            
            <button 
              onClick={() => onMessage(user)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] 
                         text-white px-3 py-1.5 rounded-xl text-sm font-medium
                         hover:shadow-lg hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30
                         transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Knock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
