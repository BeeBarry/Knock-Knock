import { useState } from 'react';
import CommunityCard from '../components/CommunityCard';
import SearchFilter from '../components/SearchFilter';
import { mockUsers } from '../data/mockData';
import { User } from '../types/community';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Users } from 'lucide-react';
import Header from '../components/Header';

const Community = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Get all unique skills
  const allSkills = Array.from(new Set(mockUsers.flatMap(user => user.expertise))).sort();

  // Filter users based on search and selected skills
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => user.expertise.includes(skill));
    
    return matchesSearch && matchesSkills;
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleMessage = (user: User) => {
    console.log('Starting conversation with:', user.name);
    navigate('/messages', { state: { selectedUser: user } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton={true} title="Community" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Find Your Neighborhood Experts
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with skilled neighbors ready to help with your projects
          </p>
        </div>

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSkills={selectedSkills}
          onSkillToggle={handleSkillToggle}
          availableSkills={allSkills}
        />

        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Found {filteredUsers.length} neighbor{filteredUsers.length !== 1 ? 's' : ''} ready to help
          </p>
          {selectedSkills.length > 0 && (
            <button
              onClick={() => setSelectedSkills([])}
              className="text-[hsl(var(--coral))] hover:text-[hsl(var(--coral-light))] font-medium transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <CommunityCard 
              key={user.id} 
              user={user} 
              onMessage={handleMessage}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No neighbors found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or clearing the filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSkills([]);
              }}
              className="btn-warm flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
