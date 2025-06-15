
import { Search } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  availableSkills: string[];
}

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedSkills, 
  onSkillToggle, 
  availableSkills 
}: SearchFilterProps) => {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg shadow-orange-100/20 dark:shadow-orange-950/20 border border-border/30 mb-6">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/50 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, skill, or expertise..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="warm-input w-full pl-12"
        />
      </div>
      
      <div>
        <h4 className="font-medium text-foreground mb-3">Filter by expertise:</h4>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedSkills.includes(skill)
                  ? 'bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--coral-secondary))] text-white shadow-md'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
