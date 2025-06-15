
import { Users, Heart, BookOpen, HandHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/StatsCard';
import Header from '../components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { profileService } from '../services/profiles';
import { mapProfileToUser } from '../utils/dataMapping';

const Home = () => {
  const navigate = useNavigate();

  // Fetch profiles from API
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: profileService.getAllProfiles,
  });

  // Convert profiles to users
  const users = profiles.map(mapProfileToUser);

  // Calculate stats from real data
  const stats = {
    totalMembers: users.length,
    helpSessionsThisWeek: users.reduce((total, user) => total + user.previouslyHelped.length, 0),
    skillsShared: Array.from(new Set(users.flatMap(user => user.expertise))).length,
    neighborsHelped: users.filter(user => user.previouslyHelped.length > 0).length
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to your neighborhood! 👋
          </h2>
          <p className="text-xl text-muted-foreground/70 mb-8 max-w-2xl mx-auto">
            Connect with skilled neighbors, share your expertise, and build a stronger community together.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button 
              onClick={() => navigate('/profile')}
              className="btn-warm"
            >
              ✨ Offer Your Help
            </button>
            <button 
              onClick={() => navigate('/community')}
              className="btn-secondary"
            >
              🔍 Find Help
            </button>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatsCard
            icon={<Users className="w-8 h-8" />}
            value={stats.totalMembers}
            label="Community Members"
            color="coral"
          />
          <StatsCard
            icon={<Heart className="w-8 h-8" />}
            value={stats.helpSessionsThisWeek}
            label="Helps This Week"
            color="sage"
          />
          <StatsCard
            icon={<BookOpen className="w-8 h-8" />}
            value={stats.skillsShared}
            label="Skills Shared"
            color="sunny"
          />
          <StatsCard
            icon={<HandHeart className="w-8 h-8" />}
            value={stats.neighborsHelped}
            label="Neighbors Helped"
            color="coral"
          />
        </div>

        {/* Featured Neighbors */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            ⭐ Featured Neighbors
          </h3>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="community-card animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div>
                      <div className="h-4 bg-muted rounded w-24 mb-2" />
                      <div className="h-3 bg-muted rounded w-20" />
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4 mb-3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : users.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.slice(0, 3).map((user) => (
                <div key={user.id} className="community-card">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--coral))] to-[hsl(var(--sage))] text-white font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.profession}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {user.bio.slice(0, 80)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.slice(0, 2).map((skill, index) => (
                      <span key={index} className="expertise-badge text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No community members yet. Be the first to join!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
