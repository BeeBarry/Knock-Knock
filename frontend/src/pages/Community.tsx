// src/pages/Community.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { communityUsers } from '../data';
import PersonCard from '../components/PersonCard';
import ExpertiseFilter from '../components/ExpertiseFilter';

export default function Community() {
    const [selectedExpertise, setSelectedExpertise] = useState('Alla');
    const navigate = useNavigate();

    const filteredUsers = communityUsers.filter(user =>
        selectedExpertise === 'Alla' ||
        user.expertise.some(skill => skill.toLowerCase() === selectedExpertise.toLowerCase())
    );

    const handleKnock = (userId: string) => {
        navigate(`/chat/${userId}`);
    };

    const handleViewProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-200 p-4">
                <h1 className="text-xl font-semibold text-center">Your Community</h1>
            </div>

            <ExpertiseFilter
                selectedExpertise={selectedExpertise}
                onFilterChange={setSelectedExpertise}
            />

            <div className="p-4 space-y-3">
                {filteredUsers.map(user => (
                    <PersonCard
                        key={user.id}
                        user={user}
                        onKnock={handleKnock}
                        onViewProfile={handleViewProfile}
                    />
                ))}
            </div>
        </div>
    );
}