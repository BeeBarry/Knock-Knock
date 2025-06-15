// src/components/ExpertiseFilter.tsx
import { expertiseCategories } from '../data';

interface ExpertiseFilterProps {
    selectedExpertise: string;
    onFilterChange: (expertise: string) => void;
}

export default function ExpertiseFilter({ selectedExpertise, onFilterChange }: ExpertiseFilterProps) {
    return (
        <div className="p-4 bg-white border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Filtrera efter expertis:</p>
            <div className="flex space-x-2 overflow-x-auto">
                {expertiseCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onFilterChange(category)}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                            selectedExpertise === category
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}